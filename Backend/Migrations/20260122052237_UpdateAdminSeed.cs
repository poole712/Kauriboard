using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KauriBoardApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 22, 36, 949, DateTimeKind.Utc).AddTicks(9803));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEAAVlNY3BpNBa7gceYzbSRB7fGufJIjJYHTSWMYtiYp75C/0gWeotU5GR/ql0QLk6g==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 1, 49, 286, DateTimeKind.Utc).AddTicks(8310));

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 1, 49, 286, DateTimeKind.Utc).AddTicks(4581));

            migrationBuilder.UpdateData(
                table: "TaskItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 1, 22, 5, 1, 49, 286, DateTimeKind.Utc).AddTicks(4615));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "hashedpassword");
        }
    }
}
