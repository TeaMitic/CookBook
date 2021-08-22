using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recept_Knjiga_KnjigaID",
                table: "Recept");

            migrationBuilder.DropColumn(
                name: "IDKnjige",
                table: "Recept");

            migrationBuilder.AlterColumn<int>(
                name: "KnjigaID",
                table: "Recept",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Recept_Knjiga_KnjigaID",
                table: "Recept",
                column: "KnjigaID",
                principalTable: "Knjiga",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recept_Knjiga_KnjigaID",
                table: "Recept");

            migrationBuilder.AlterColumn<int>(
                name: "KnjigaID",
                table: "Recept",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IDKnjige",
                table: "Recept",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Recept_Knjiga_KnjigaID",
                table: "Recept",
                column: "KnjigaID",
                principalTable: "Knjiga",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
