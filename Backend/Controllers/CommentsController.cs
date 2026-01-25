using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly KauriContext _db;

        public CommentsController(KauriContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddComment(AddCommentRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var user = _db.Users.SingleOrDefault(u => u.Id == userId);

            var task = _db.TaskItems.SingleOrDefault(ta => ta.Id == request.taskId);
            if (task == null)
            {
                return BadRequest("Task does not exist.");
            }

            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);
            if (!isMember)
            {
                return Forbid();
            }

            var comment = new Comment
            {
                Message = request.message,
                UserId = userId,
                TaskItemId = request.taskId
            };

            var userName = user != null ? user.Name : "Unknown";

            _db.Comments.Add(comment);
            _db.SaveChanges();

            return Created("", new CommentDTO(comment.Message, userName, comment.Id, userId, comment.TaskItemId, comment.CreatedAt));

        }

        [Authorize]
        [HttpDelete("{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var comment = _db.Comments.SingleOrDefault(c => c.Id == commentId);
            if (comment == null)
            {
                return NotFound();
            }

            if (comment.UserId != userId)
            {
                return Forbid();
            }

            _db.Comments.Remove(comment);
            _db.SaveChanges();

            return NoContent();
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllCommentsForTask([FromQuery] int taskId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var task = _db.TaskItems.SingleOrDefault(ta => ta.Id == taskId);
            if (task == null)
            {
                return NotFound();
            }

            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);
            if (!isMember)
            {
                return Forbid();
            }

            var comments = _db.Comments
                .Where(c => c.TaskItemId == taskId)
                .OrderBy(c => c.CreatedAt)
                .Select(c => new CommentDTO(c.Message, c.User.Name, c.Id, c.UserId, c.TaskItemId, c.CreatedAt))
                .ToList();

            return Ok(comments);
        }

        public record AddCommentRequest(string message, int taskId);
        public record CommentDTO(string message, string name, int commentId, int userId, int taskId, DateTime createdAt);
    }
}