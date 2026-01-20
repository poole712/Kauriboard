using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Backend.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TaskItemId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(500)]
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Navigation properties
        [Required]
        public TaskItem TaskItem { get; set; }

        [Required]
        public User User { get; set; }
    }
}