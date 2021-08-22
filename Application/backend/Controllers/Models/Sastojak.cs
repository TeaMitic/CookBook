using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Sastojak")]
    public class Sastojak
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public string Naziv { get; set; }

        [Column("Kalorije")]
        public double Kalorije { get; set; }

        [Column("MernaJedinica")]
        public string MernaJedinica { get; set; }

        [JsonIgnore]
        public virtual IList<PripadaReceptu> PripadaReceptima { get; set; }

        
    }

}