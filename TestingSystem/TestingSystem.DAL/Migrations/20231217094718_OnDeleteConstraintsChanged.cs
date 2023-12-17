using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class OnDeleteConstraintsChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllowList_Users_AllowedUsersId",
                table: "AllowList");

            migrationBuilder.DropForeignKey(
                name: "FK_Logs_Tests_TestId",
                table: "Logs");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestVariant_TestVariants_TestVariantsId",
                table: "QuestionTestVariant");

            migrationBuilder.AlterColumn<bool>(
                name: "IsCorrect",
                table: "VariantsOfAnswer",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsAccessOpen",
                table: "Tests",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Duration",
                table: "Tests",
                type: "time",
                nullable: true,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Logs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TestId",
                table: "Logs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AllowList_Users_AllowedUsersId",
                table: "AllowList",
                column: "AllowedUsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Logs_Tests_TestId",
                table: "Logs",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestVariant_TestVariants_TestVariantsId",
                table: "QuestionTestVariant",
                column: "TestVariantsId",
                principalTable: "TestVariants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllowList_Users_AllowedUsersId",
                table: "AllowList");

            migrationBuilder.DropForeignKey(
                name: "FK_Logs_Tests_TestId",
                table: "Logs");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestVariant_TestVariants_TestVariantsId",
                table: "QuestionTestVariant");

            migrationBuilder.AlterColumn<bool>(
                name: "IsCorrect",
                table: "VariantsOfAnswer",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsAccessOpen",
                table: "Tests",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Duration",
                table: "Tests",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0),
                oldClrType: typeof(TimeSpan),
                oldType: "time",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Logs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TestId",
                table: "Logs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowList_Users_AllowedUsersId",
                table: "AllowList",
                column: "AllowedUsersId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Logs_Tests_TestId",
                table: "Logs",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestVariant_TestVariants_TestVariantsId",
                table: "QuestionTestVariant",
                column: "TestVariantsId",
                principalTable: "TestVariants",
                principalColumn: "Id");
        }
    }
}
