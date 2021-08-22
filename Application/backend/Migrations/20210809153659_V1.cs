using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Knjiga",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KratakOpis = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    brRecepta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjiga", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sastojak",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kalorije = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sastojak", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Recept",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Postupak = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tezina = table.Column<int>(type: "int", nullable: false),
                    Vreme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kalorije = table.Column<double>(type: "float", nullable: false),
                    SastojciID = table.Column<int>(type: "int", nullable: true),
                    IDKnjige = table.Column<int>(type: "int", nullable: false),
                    KnjigaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recept", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Recept_Knjiga_KnjigaID",
                        column: x => x.KnjigaID,
                        principalTable: "Knjiga",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Recept_Sastojak_SastojciID",
                        column: x => x.SastojciID,
                        principalTable: "Sastojak",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PripadaReceptu",
                columns: table => new
                {
                    ReceptID = table.Column<int>(type: "int", nullable: false),
                    SastojakID = table.Column<int>(type: "int", nullable: false),
                    Kolicina = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PripadaReceptu", x => new { x.ReceptID, x.SastojakID });
                    table.ForeignKey(
                        name: "FK_PripadaReceptu_Recept_ReceptID",
                        column: x => x.ReceptID,
                        principalTable: "Recept",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PripadaReceptu_Sastojak_SastojakID",
                        column: x => x.SastojakID,
                        principalTable: "Sastojak",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PripadaReceptu_SastojakID",
                table: "PripadaReceptu",
                column: "SastojakID");

            migrationBuilder.CreateIndex(
                name: "IX_Recept_KnjigaID",
                table: "Recept",
                column: "KnjigaID");

            migrationBuilder.CreateIndex(
                name: "IX_Recept_SastojciID",
                table: "Recept",
                column: "SastojciID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PripadaReceptu");

            migrationBuilder.DropTable(
                name: "Recept");

            migrationBuilder.DropTable(
                name: "Knjiga");

            migrationBuilder.DropTable(
                name: "Sastojak");
        }
    }
}
