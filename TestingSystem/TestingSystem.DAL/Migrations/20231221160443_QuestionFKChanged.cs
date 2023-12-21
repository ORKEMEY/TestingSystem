using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class QuestionFKChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionsAssemblyId",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions",
                column: "QuestionsAssemblyId",
                principalTable: "QuestionsAssemblies",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionsAssemblyId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions",
                column: "QuestionsAssemblyId",
                principalTable: "QuestionsAssemblies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
