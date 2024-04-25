using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestingSystem.DAL.Migrations
{
    public partial class ModelsDrop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Models_ModelId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "QuestionsAssemblies");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ModelId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_QuestionsAssemblyId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "QuestionsAssemblyId",
                table: "Questions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuestionsAssemblyId",
                table: "Questions",
                type: "int",
                nullable: true);

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
                name: "QuestionsAssemblies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ModelId",
                table: "Questions",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuestionsAssemblyId",
                table: "Questions",
                column: "QuestionsAssemblyId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionsAssemblies_OwnerId",
                table: "QuestionsAssemblies",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Models_ModelId",
                table: "Questions",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionsAssemblies_QuestionsAssemblyId",
                table: "Questions",
                column: "QuestionsAssemblyId",
                principalTable: "QuestionsAssemblies",
                principalColumn: "Id");
        }
    }
}
