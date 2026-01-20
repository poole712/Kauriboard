using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class ProjectUser
    {
        public int ProjectId { get; set; }
        public Project Project{ get; set; }

        public int UserId { get; set; }
        public User User{ get; set; }

        public string Role { get; set; } = "Member";
    }
}