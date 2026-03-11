using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KauriBoardApi.Migrations
{
    /// <inheritdoc />
    public partial class MakePasswordNonRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 58, 8, 568, DateTimeKind.Utc).AddTicks(8359));

            migrationBuilder.UpdateData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 58, 8, 568, DateTimeKind.Utc).AddTicks(4554));

            migrationBuilder.UpdateData(
                table: "TaskItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 3, 10, 21, 58, 8, 568, DateTimeKind.Utc).AddTicks(4579));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEELapsRDddnJhC25fStgH2mXUPUS4gkvTkr6cHB1OAoe+B8MTF4jXAdrXVfWlVoxGQ==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
    }
}
