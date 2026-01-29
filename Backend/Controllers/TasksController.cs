using System;
using System.Collections.Generic;
using System.Linq;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly KauriContext _db;

        public TasksController(KauriContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public IActionResult GetTask(int id)
        {
            var task = _db.TaskItems.SingleOrDefault(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            // Check if the project users join table has an entry for this user and the task's project
            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);

            if (!isMember)
            {
                return Forbid();
            }

            return Ok(new TaskDTO(task.Id, task.Name, task.Description, task.Status.ToString(), task.ProjectId, task.CreatedAt, task.AssignedToUserId));
        }

        [Authorize]
        [HttpGet("{projectId:int}/getall")]
        public IActionResult GetAllTasks(int projectId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == projectId);

            if(!isMember)
            {
                return NotFound();
            }

            var tasks = _db.TaskItems.Where(t => t.ProjectId == projectId).ToList();

            return Ok(tasks);
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateTask(CreateTaskRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == request.ProjectId);

            if (!isMember)
            {
                return Forbid();
            }

            var Task = new TaskItem
            {
                ProjectId = request.ProjectId,
                Name = request.Name,
                Description = request.Description,
                AssignedToUserId = request.AssignedToUserId
            };

            if (!Enum.TryParse<TaskCurrentStatus>(request.Status, out var status))
                return BadRequest("Invalid status value.");

            Task.Status = status;

            _db.TaskItems.Add(Task);
            _db.SaveChanges();

            return Created("created", new TaskDTO(Task.Id, Task.Name, Task.Description, Task.Status.ToString(), Task.ProjectId, Task.CreatedAt, Task.AssignedToUserId));


        }

        [Authorize]
        [HttpPut("{id:int}")]
        public IActionResult UpdateTask(int id, [FromBody] UpdateTaskRequest request)
        {
            var task = _db.TaskItems.SingleOrDefault(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);

            if (!isMember)
            {
                return Forbid();
            }

            // Update the task with the new values
            // Use ?? null-coalescing operator to keep existing values if new ones are not provided
            task.Name = request.Name ?? task.Name;
            task.Description = request.Description ?? task.Description;

            // Use a tryparse to ensure valid enum conversion 
            if (!Enum.TryParse<TaskCurrentStatus>(request.Status, out var status))
            {
                return BadRequest("Invalid status value.");
            }
            task.Status = status;

            // If AssignedToUserId is provided, check if the user is a member of the project
            if (request.AssignedToUserId.HasValue)
            {
                var isAssigneeMember = _db.ProjectUsers.Any(pu => pu.UserId == request.AssignedToUserId.Value && pu.ProjectId == task.ProjectId);

                if (!isAssigneeMember)
                {
                    return BadRequest("Assigned user must be a member of the project.");
                }

                task.AssignedToUserId = request.AssignedToUserId.Value;
            }

            _db.SaveChanges();

            return Ok(new TaskDTO(task.Id, task.Name, task.Description, task.Status.ToString(), task.ProjectId, task.CreatedAt, task.AssignedToUserId));
        }

        [Authorize]
        [HttpPut("{id:int}/assign")]
        public IActionResult AssignUser(int id, [FromBody] AssignUserRequest request)
        {
            var task = _db.TaskItems.SingleOrDefault(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);

            if (!isMember)
            {
                return Forbid();
            }

            var assigneeExists = _db.Users.Any(u => u.Id == request.AssignedToUserId);
            if (!assigneeExists)
            {
                return BadRequest("Assigned user does not exist.");
            }

            var isAssigneeMember = _db.ProjectUsers.Any(pu => pu.UserId == request.AssignedToUserId && pu.ProjectId == task.ProjectId);

            if (!isAssigneeMember)
            {
                return BadRequest("Assigned user must be a member of the project.");
            }

            task.AssignedToUserId = request.AssignedToUserId;
            _db.SaveChanges();

            return Ok(new TaskDTO(task.Id, task.Name, task.Description, task.Status.ToString(), task.ProjectId, task.CreatedAt, task.AssignedToUserId));
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _db.TaskItems.SingleOrDefault(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == task.ProjectId);

            if (!isMember)
            {
                return Forbid();
            }

            _db.TaskItems.Remove(task);
            _db.SaveChanges();

            return NoContent();
        }

        public record AssignUserRequest(int AssignedToUserId);
        public record CreateTaskRequest(string Name, string Description, string Status, int AssignedToUserId, int ProjectId);
        public record UpdateTaskRequest(string? Name, string? Description, string? Status, int? AssignedToUserId);
        public record TaskDTO(int Id, string Name, string Description, string Status, int ProjectId, DateTime CreatedAt, int? AssignedToUserId = null);
    }
}