using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.Data
{
    public class KauriContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<ProjectUser> ProjectUsers { get; set; }

        public KauriContext(DbContextOptions<KauriContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(u =>
            {
                u.HasData(
                    new User { Id = 1, Name = "admin", Role = "Admin", Email = "admin@gmail.com", PasswordHash = "hashedpassword" }
                );
            });

            modelBuilder.Entity<Project>(p =>
            {
                p.HasData(
                    new Project { Id = 1, Name = "Initial Project", Description = "This is the first project.", CreatedAt = DateTime.UtcNow, CreatedByUserId = 1 }
                );
            });

            modelBuilder.Entity<TaskItem>(t =>
            {
                t.HasData(
                    new TaskItem { Id = 1, Name = "Initial Task", Description = "This is the first task.", Status = TaskCurrentStatus.ToDo, ProjectId = 1, CreatedAt = DateTime.UtcNow, AssignedToUserId = 1 }
                );
            });

            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.AssignedToUser)
                .WithMany()
                .HasForeignKey(t => t.AssignedToUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>(c =>
            {
                c.HasData(
                    new Comment { Id = 1, TaskItemId = 1, UserId = 1, Message = "This is the first comment.", CreatedAt = DateTime.UtcNow }
                );
            });

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}