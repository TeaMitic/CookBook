using System.Collections.Generic;

namespace DTO
{

    public class DTORecept
    {
    
            public int ID { get; set; } 

            public string Naziv { get; set; }


            public string Postupak { get; set; }


            public int Tezina { get; set; }


            public string Vreme { get; set; }



            public double Kalorije { get; set; }
        

            public int KnjigaID { get; set; }



            
            public virtual IList<DTOPripadaReceptu> SastojciRecepta { get; set; }
        
    }

}
    
