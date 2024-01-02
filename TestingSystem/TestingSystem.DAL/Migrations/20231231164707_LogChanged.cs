using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class LogChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfCorrectAnswers",
                table: "Logs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfCorrectAnswers",
                table: "Logs");
        }
    }
}
