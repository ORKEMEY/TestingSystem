using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class QuestionDiff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "aParam",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "bParam",
                table: "Questions");

            migrationBuilder.RenameColumn(
                name: "cParam",
                table: "Questions",
                newName: "Difficulty");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Difficulty",
                table: "Questions",
                newName: "cParam");

            migrationBuilder.AddColumn<double>(
                name: "aParam",
                table: "Questions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "bParam",
                table: "Questions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
