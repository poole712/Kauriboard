using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using Org.BouncyCastle.Asn1.Cms;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvitesController : ControllerBase
    {
        private readonly KauriContext _db;

        public InvitesController(KauriContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateInvite([FromBody] CreateInviteRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var isMember = _db.ProjectUsers.Any(pu => pu.UserId == userId && pu.ProjectId == request.ProjectId);
            if (!isMember) return Forbid();

            var token = Guid.NewGuid().ToString("N");

            var invite = new Invite
            {
                Email = request.Email,
                ProjectId = request.ProjectId,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddHours(12),
                Used = false,
                InvitedByUserId = userId
            };

            _db.Invites.Add(invite);
            _db.SaveChanges();

            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("KauriBoard", "fletchdev712@gmail.com"));
            email.To.Add(new MailboxAddress("New Invited User", request.Email));

            var inviteUrl = $"http://localhost:5173/invite?token={token}";

            email.Subject = "KauriBoard Invite";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = $"<p>You have been invited to join a project on <b>KauriBoard</b>. Use the following token to accept the invite: <a href='{inviteUrl}'>Accept Invite</a></p>"
            };

            using (var stmp = new SmtpClient())
            {
                stmp.Connect("smtp.gmail.com", 587, false);
                stmp.Authenticate("fletchdev712@gmail.com", "ehbf fzbd xtlk gyvz");

                stmp.Send(email);
                stmp.Disconnect(true);
            }

            return Ok(new { Message = "Invite created and email sent." });
        }

        [HttpGet("validate")]
        public IActionResult ValidateInvite([FromQuery] string token)
        {
            var invite = _db.Invites.FirstOrDefault(i => i.Token == token);
            if (invite == null || invite.Used || invite.ExpiresAt < DateTime.UtcNow)
            {
                return BadRequest(new { Message = "Invalid or expired invite token." });
            }

            return Ok(new { Message = "Invite token is valid.", ProjectId = invite.ProjectId });
        }

        [HttpPost("accept")]
        public IActionResult AcceptInvite([FromBody] AcceptInviteRequest req)
        {

            var invite = _db.Invites.SingleOrDefault(i => i.Token == req.token);
            if (invite == null || invite.Used || invite.ExpiresAt < DateTime.UtcNow)
            {
                Console.WriteLine(invite?.ExpiresAt < DateTime.UtcNow);
                return BadRequest(new { Message = "Invalid or expired invite" });
            }

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            _db.ProjectUsers.Add(new ProjectUser
            {
                UserId = userId,
                ProjectId = invite.ProjectId
            });

            invite.Used = true;
            _db.SaveChanges();

            return Ok(new { Message = "Invite Accepted" });
        }

        public record CreateInviteRequest(string Email, int ProjectId);
        public record AcceptInviteRequest(string token);
    }
}