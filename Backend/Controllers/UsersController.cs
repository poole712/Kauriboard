using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly KauriContext _db;

        public UsersController(KauriContext db)
        {
            _db = db;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public IActionResult GetUser(int id)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDto(user.Id, user.Name, user.Email, user.Role));
        }

        [Authorize]
        [HttpPut("me")]
        public IActionResult UpdateProfile([FromBody] UpdateUserRequest updatedUser)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var user = _db.Users.FirstOrDefault(x => x.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            // Update other fields as necessary

            _db.SaveChanges();

            return Ok(new UserDto(user.Id, user.Name, user.Email, user.Role));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admins")]
        public IActionResult AdminList()
        {
            var admins = _db.Users
                .Where(u => u.Role == "Admin")
                .Select(u => new UserDto(u.Id, u.Name, u.Email, u.Role))
                .ToList();
                
            return Ok(admins);
        }

        public record UpdateUserRequest
        {
            public int Id { get; init; }
            public string Name { get; init; } = string.Empty;
            public string Email { get; init; } = string.Empty;
            // Add other fields as necessary
        }

        public record UserDto(int id, string name, string email, string role);
    }
}