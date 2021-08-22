using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    
    public class CookBookContext : DbContext
    {
        public DbSet<Knjiga> Knjige {get; set;} //template klasa koja kreira proprety lista necega sto se nalazi u bazi, referenca na podatke koje je nas model pokupio iz baze
        public DbSet<Recept> Recepti {get; set;}
        public DbSet<Sastojak> Sastojci {get; set;}
        public DbSet<PripadaReceptu> PripadaReceptu {get; set;}
        public CookBookContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //za definisanje ogranicenja
            modelBuilder.Entity<PripadaReceptu>().HasKey(ck => new {
                ck.ReceptID,ck.SastojakID
            });
        }
    }

} 