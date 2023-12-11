using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class InitialState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EMail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuestionsAssemblies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionsAssemblies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionsAssemblies_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    OpeningTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosureTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsAccessOpen = table.Column<bool>(type: "bit", nullable: false),
                    NumberOfVariants = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tests_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    QuestionTypeId = table.Column<int>(type: "int", nullable: false),
                    QuestionsAssemblyId = table.Column<int>(type: "int", nullable: false),
                    Query = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bParam = table.Column<int>(type: "int", nullable: false),
                    aParam = table.Column<int>(type: "int", nullable: false),
                    cParam = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                        column: x => x.QuestionsAssemblyId,
                        principalTable: "QuestionsAssemblies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Questions_QuestionTypes_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "QuestionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllowList",
                columns: table => new
                {
                    AccessibleTestsId = table.Column<int>(type: "int", nullable: false),
                    AllowedUsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowList", x => new { x.AccessibleTestsId, x.AllowedUsersId });
                    table.ForeignKey(
                        name: "FK_AllowList_Tests_AccessibleTestsId",
                        column: x => x.AccessibleTestsId,
                        principalTable: "Tests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AllowList_Users_AllowedUsersId",
                        column: x => x.AllowedUsersId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TagTest",
                columns: table => new
                {
                    TagsId = table.Column<int>(type: "int", nullable: false),
                    TestsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagTest", x => new { x.TagsId, x.TestsId });
                    table.ForeignKey(
                        name: "FK_TagTest_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TagTest_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestVariants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<int>(type: "int", nullable: false),
                    TestId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestVariants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestVariants_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTag",
                columns: table => new
                {
                    QuestionsId = table.Column<int>(type: "int", nullable: false),
                    TagsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTag", x => new { x.QuestionsId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_QuestionTag_Questions_QuestionsId",
                        column: x => x.QuestionsId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionTag_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VariantsOfAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VariantsOfAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VariantsOfAnswer_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTestVariant",
                columns: table => new
                {
                    QuestionsId = table.Column<int>(type: "int", nullable: false),
                    TestVariantsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTestVariant", x => new { x.QuestionsId, x.TestVariantsId });
                    table.ForeignKey(
                        name: "FK_QuestionTestVariant_Questions_QuestionsId",
                        column: x => x.QuestionsId,
                        principalTable: "Questions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuestionTestVariant_TestVariants_TestVariantsId",
                        column: x => x.TestVariantsId,
                        principalTable: "TestVariants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllowList_AllowedUsersId",
                table: "AllowList",
                column: "AllowedUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ModelId",
                table: "Questions",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuestionsAssemblyId",
                table: "Questions",
                column: "QuestionsAssemblyId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuestionTypeId",
                table: "Questions",
                column: "QuestionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionsAssemblies_OwnerId",
                table: "QuestionsAssemblies",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTag_TagsId",
                table: "QuestionTag",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTestVariant_TestVariantsId",
                table: "QuestionTestVariant",
                column: "TestVariantsId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TagTest_TestsId",
                table: "TagTest",
                column: "TestsId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_OwnerId",
                table: "Tests",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_TestVariants_TestId",
                table: "TestVariants",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_VariantsOfAnswer_QuestionId",
                table: "VariantsOfAnswer",
                column: "QuestionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllowList");

            migrationBuilder.DropTable(
                name: "QuestionTag");

            migrationBuilder.DropTable(
                name: "QuestionTestVariant");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "TagTest");

            migrationBuilder.DropTable(
                name: "VariantsOfAnswer");

            migrationBuilder.DropTable(
                name: "TestVariants");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "QuestionsAssemblies");

            migrationBuilder.DropTable(
                name: "QuestionTypes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
