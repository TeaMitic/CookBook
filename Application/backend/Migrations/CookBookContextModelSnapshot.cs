﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

namespace backend.Migrations
{
    [DbContext(typeof(CookBookContext))]
    partial class CookBookContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("backend.Models.Knjiga", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("KratakOpis")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("KratakOpis");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv");

                    b.Property<int>("brRecepta")
                        .HasColumnType("int")
                        .HasColumnName("brRecepta");

                    b.HasKey("ID");

                    b.ToTable("Knjiga");
                });

            modelBuilder.Entity("backend.Models.PripadaReceptu", b =>
                {
                    b.Property<int>("ReceptID")
                        .HasColumnType("int")
                        .HasColumnName("ReceptID");

                    b.Property<int>("SastojakID")
                        .HasColumnType("int")
                        .HasColumnName("SastojakID");

                    b.Property<double>("Kolicina")
                        .HasColumnType("float")
                        .HasColumnName("Kolicina");

                    b.HasKey("ReceptID", "SastojakID");

                    b.HasIndex("SastojakID");

                    b.ToTable("PripadaReceptu");
                });

            modelBuilder.Entity("backend.Models.Recept", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Kalorije")
                        .HasColumnType("float")
                        .HasColumnName("Kalorije");

                    b.Property<int>("KnjigaID")
                        .HasColumnType("int")
                        .HasColumnName("KnjigaID");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv");

                    b.Property<string>("Postupak")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Postupak");

                    b.Property<int>("Tezina")
                        .HasColumnType("int")
                        .HasColumnName("Tezina");

                    b.Property<string>("Vreme")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Vreme");

                    b.HasKey("ID");

                    b.HasIndex("KnjigaID");

                    b.ToTable("Recept");
                });

            modelBuilder.Entity("backend.Models.Sastojak", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Kalorije")
                        .HasColumnType("float")
                        .HasColumnName("Kalorije");

                    b.Property<string>("MernaJedinica")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("MernaJedinica");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Naziv");

                    b.HasKey("ID");

                    b.ToTable("Sastojak");
                });

            modelBuilder.Entity("backend.Models.PripadaReceptu", b =>
                {
                    b.HasOne("backend.Models.Recept", "Recept")
                        .WithMany("SastojciRecepta")
                        .HasForeignKey("ReceptID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Sastojak", "Sastojak")
                        .WithMany("PripadaReceptima")
                        .HasForeignKey("SastojakID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recept");

                    b.Navigation("Sastojak");
                });

            modelBuilder.Entity("backend.Models.Recept", b =>
                {
                    b.HasOne("backend.Models.Knjiga", "Knjiga")
                        .WithMany("Recepti")
                        .HasForeignKey("KnjigaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Knjiga");
                });

            modelBuilder.Entity("backend.Models.Knjiga", b =>
                {
                    b.Navigation("Recepti");
                });

            modelBuilder.Entity("backend.Models.Recept", b =>
                {
                    b.Navigation("SastojciRecepta");
                });

            modelBuilder.Entity("backend.Models.Sastojak", b =>
                {
                    b.Navigation("PripadaReceptima");
                });
#pragma warning restore 612, 618
        }
    }
}
