using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace backend.Models
{
    [Table("Knjiga")]
    public class Knjiga 
    {
         // kolone u bazi
       [Key]
       [Column("ID")]      
       public int ID {get; set;}

       [Column("Naziv")]
       [MaxLength(255)]
       public string Naziv {get; set;}
       
       [Column("KratakOpis")]
       [MaxLength(255)]
       public string KratakOpis {get; set;}
       
       [Column("brRecepta")]
       public int brRecepta { get; set; }
       public virtual List<Recept> Recepti { get; set; } //kada imamo kolekcije necega treba da ih oznacimo kao virtual

        
    }

}