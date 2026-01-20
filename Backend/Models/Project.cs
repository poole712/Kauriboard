using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set;}  

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public int CreatedByUserId { get; set; }

        //Navigation properties
        public User CreatedByUser { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
        public ICollection<ProjectUser> Users{ get; set; } = new List<ProjectUser>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}