using System.Collections.Generic;
using backend.Models;

namespace DTO
{  
    public class DTOHelper
    {
        public Recept DTOToRecept(DTORecept dTORecept)
        {
            var recept = new Recept();
            recept.ID = dTORecept.ID;
            recept.KnjigaID = dTORecept.KnjigaID;       
            recept.Naziv = dTORecept.Naziv;
            recept.Vreme = dTORecept.Vreme;
            recept.Tezina = dTORecept.Tezina;
            recept.Postupak = dTORecept.Postupak;
            if(dTORecept.SastojciRecepta != null)
                recept.SastojciRecepta = DTOToPripadaReceptu(dTORecept.SastojciRecepta);
            return recept;
        }

        public IList<PripadaReceptu> DTOToPripadaReceptu(IList<DTOPripadaReceptu> listaPripadanja)
        {
            IList<PripadaReceptu> pripadanjaDB = new List<PripadaReceptu>();
            foreach (DTOPripadaReceptu item in listaPripadanja)
            {
                PripadaReceptu p = new PripadaReceptu();
                p.ReceptID = item.ReceptID;
                p.SastojakID = item.SastojakID;
                p.Kolicina = item.Kolicina;
                pripadanjaDB.Add(p);
            }
            return pripadanjaDB;
        }
    }
    
}