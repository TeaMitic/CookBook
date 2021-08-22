using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MernaJedinica",
                table: "Sastojak",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MernaJedinica",
                table: "Sastojak");
        }
    }
}
