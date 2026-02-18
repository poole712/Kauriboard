using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KauriBoardApi.Migrations
{
    /// <inheritdoc />
    public partial class AddInvitesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Used = table.Column<bool>(type: "bit", nullable: false),
                    InvitedByUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
                });

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
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTime(2026, 2, 15, 21, 15, 18, 734, DateTimeKind.Utc).AddTicks(2361), 1 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEMfNpfnfNtNzHJIubay9Eh4RlloMp/fOqgU6dqg+BihW+dChYd/PX/N4yEEK0QaZzg==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 22, 36, 950, DateTimeKind.Utc).AddTicks(6750));

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 22, 36, 949, DateTimeKind.Utc).AddTicks(9766));

            migrationBuilder.UpdateData(
                table: "TaskItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTime(2026, 1, 22, 5, 22, 36, 949, DateTimeKind.Utc).AddTicks(9803), 0 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEAAVlNY3BpNBa7gceYzbSRB7fGufJIjJYHTSWMYtiYp75C/0gWeotU5GR/ql0QLk6g==");
        }
    }
}
