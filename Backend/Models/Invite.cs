namespace Backend.Models
{
    public class Invite
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int ProjectId { get; set; }
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddDays(1);
        public bool Used { get; set; } = false;
        public int InvitedByUserId { get; set; }
    }
}