using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recept_Sastojak_SastojciID",
                table: "Recept");

            migrationBuilder.DropIndex(
                name: "IX_Recept_SastojciID",
                table: "Recept");

            migrationBuilder.DropColumn(
                name: "SastojciID",
                table: "Recept");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SastojciID",
                table: "Recept",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recept_SastojciID",
                table: "Recept",
                column: "SastojciID");

            migrationBuilder.AddForeignKey(
                name: "FK_Recept_Sastojak_SastojciID",
                table: "Recept",
                column: "SastojciID",
                principalTable: "Sastojak",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
