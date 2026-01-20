using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly KauriContext _db;

        public ProjectsController(KauriContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpGet("{id:int}")]
        public IActionResult GetProject(int id)
        {
            var project = _db.Projects.FirstOrDefault(x => x.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllProjects()
        {
            var userId = int.Parse(User.FindFirst("sub")!.Value);

            var projects = _db.ProjectUsers.Where(pu => pu.UserId == userId)
                .Select(pu => new ProjectDTO(pu.Project.Id, pu.Project.Name, pu.Project.Description))
                .ToList();

            return Ok(projects);
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateProject(CreateProjectRequest request)
        {
            var userId = int.Parse(User.FindFirst("sub")!.Value);

            var project = new Project
            {
                Name = request.Name,
                Description = request.Description,
                CreatedByUserId = userId
            };

            _db.Projects.Add(project);
            _db.SaveChanges();

            _db.ProjectUsers.Add(new ProjectUser
            {
                UserId = userId,
                Project = project,
                Role = "Owner"
            });
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, new ProjectDTO(project.Id, project.Name, project.Description));
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public IActionResult DeleteProject(int id)
        {
            var project = _db.Projects.SingleOrDefault(x => x.Id == id);
            var userId = int.Parse(User.FindFirst("sub")!.Value);

            if (project == null)
            {
                return NotFound();
            }

            var projectUser = _db.ProjectUsers.FirstOrDefault(pu => pu.ProjectId == id && pu.UserId == userId);
            if (projectUser == null || projectUser.Role != "Owner")
            {
                return Forbid();
            }

            var members = _db.ProjectUsers.Where(pu => pu.ProjectId == id);
            _db.ProjectUsers.RemoveRange(members);

            _db.Projects.Remove(project);
            _db.SaveChanges();

            return NoContent();
        }

        public record ProjectDTO(int Id, string Name, string Description);
        public record CreateProjectRequest(string Name, string Description);
    }
}