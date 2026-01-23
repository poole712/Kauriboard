using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
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
            var hasher = new PasswordHasher<User>();
            var admin = new User
            {
                Id = 1,
                Name = "admin",
                Role = "Admin",
                Email = "admin@gmail.com"
            };

            admin.PasswordHash = hasher.HashPassword(admin, "Piggy712!0");

            modelBuilder.Entity<User>(u =>
            {
                u.HasData(admin);
            });

            modelBuilder.Entity<ProjectUser>()
                .HasOne(pu => pu.User)
                .WithMany()
                .HasForeignKey(pu => pu.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProjectUser>()
                .HasOne(pu => pu.Project)
                .WithMany(p => p.Users)
                .HasForeignKey(pu => pu.ProjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProjectUser>()
                .HasKey(pu => new { pu.ProjectId, pu.UserId });

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