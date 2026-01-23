using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly KauriContext _db;
        private readonly JwtTokenService _jwtTokenService;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthController(KauriContext db, JwtTokenService jwtTokenService, IPasswordHasher<User> passwordHasher)
        {
            _db = db;
            _jwtTokenService = jwtTokenService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var token = _jwtTokenService.GenerateToken(user);

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest register)
        {
            var existingUser = await _db.Users.AnyAsync(u => u.Email == register.Email);
            if (existingUser)
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            var user = new User
            {
                Email = register.Email,
                Name = register.Name,
                Role = "User"
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, register.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok("User registered successfully.");
        }
    }

    public record LoginRequest(string Email, string Password);

    public record RegisterRequest(string Email, string Name, string Password);
}