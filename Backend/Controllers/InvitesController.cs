using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Cms;
using Backend.Models;
using Resend;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvitesController : ControllerBase
    {
        private readonly KauriContext _db;
        private readonly IResend _resend;

        public InvitesController(KauriContext db, IResend resend)
        {
            _db = db;
            _resend = resend;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateInviteAsync([FromBody] CreateInviteRequest request)
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

            var inviteUrl = $"https://kauriboard.vercel.app/invite?token={token}";

            var message = new EmailMessage();
            message.From = "fletchdev712.win";
            message.To = request.Email;
            message.Subject = "KauriBoard Invitation";
            message.HtmlBody = $"<p>You have been invited to join a project on <b>KauriBoard</b>. Use the following token to accept the invite: <a href='{inviteUrl}'>Accept Invite</a></p>";

            await _resend.EmailSendAsync(message);

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