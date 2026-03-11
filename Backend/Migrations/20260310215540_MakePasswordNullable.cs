using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KauriBoardApi.Migrations
{
    /// <inheritdoc />
    public partial class MakePasswordNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 55, 40, 405, DateTimeKind.Utc).AddTicks(5187));

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 55, 40, 405, DateTimeKind.Utc).AddTicks(1814));

            migrationBuilder.UpdateData(
                table: "TaskItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 55, 40, 405, DateTimeKind.Utc).AddTicks(1837));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAELY/m5cfWNWNsutht+8jsUz/8bs6FaU+dkz4F+2Z77dhHouqvQ3HW/9zQbOGOtUXyA==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 2, 15, 21, 15, 18, 734, DateTimeKind.Utc).AddTicks(5897));

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 2, 15, 21, 15, 18, 734, DateTimeKind.Utc).AddTicks(2338));

            migrationBuilder.UpdateData(
                table: "TaskItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 2, 15, 21, 15, 18, 734, DateTimeKind.Utc).AddTicks(2361));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEMfNpfnfNtNzHJIubay9Eh4RlloMp/fOqgU6dqg+BihW+dChYd/PX/N4yEEK0QaZzg==");
        }
    }
}
