using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class LogChanged2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Zero",
                table: "Logs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Zero",
                table: "Logs",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
