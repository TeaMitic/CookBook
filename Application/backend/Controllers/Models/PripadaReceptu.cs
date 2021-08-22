using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("PripadaReceptu")]
    public class PripadaReceptu
    {
        [Column("ReceptID")]
        public int ReceptID { get; set; }

        [JsonIgnore]
        public virtual Recept Recept {get; set;}
        
        [Column("SastojakID")]
        public int SastojakID { get; set; }

        [JsonIgnore]
        public virtual Sastojak Sastojak {get; set;}

        [Column("Kolicina")]
        public double Kolicina { get; set; }
         


    }
}