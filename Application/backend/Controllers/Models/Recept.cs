using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Recept")]
    public class Recept
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; } 

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("Postupak")]
        public string Postupak { get; set; }

        [Column("Tezina")]
        public int Tezina { get; set; }

        [Column("Vreme")]
        public string Vreme { get; set; }

        [Column("Kalorije")]
        //kako double u bazi?
        public double Kalorije { get; set; }
     
        [Column("KnjigaID")]
        [Required]
        public int KnjigaID { get; set; }

        [JsonIgnore]
        public virtual Knjiga Knjiga {get; set;} //pokazivac kojoj knjizi pripada
        
        public virtual IList<PripadaReceptu> SastojciRecepta { get; set; }
    }

}