using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Backend.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public TaskCurrentStatus Status { get; set; } = TaskCurrentStatus.ToDo;

        [Required]
        public int AssignedToUserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Navigation properties
        public User AssignedToUser { get; set; }
        public Project Project { get; set; }

    }
}