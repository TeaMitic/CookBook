using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using DTO;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CookBookController : ControllerBase
    {    
        public CookBookContext Context { get; set; }

        public CookBookController(CookBookContext context)
        {
            Context = context;            
        }     
        //sada treba da se napisu fje za preuzimanje i ubacivanje podataka u bazu

        #region Knjiga

        [Route("GetAllKnjige")]
        [HttpGet]
        public async Task<IActionResult> GetAllKnjige()
        {
            try{
                var knjige = await Context.Knjige.Include(k => k.Recepti).ToListAsync();
                return Ok(knjige);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("GetKnjiga/{idKnjige}")]
        [HttpGet]
        public async Task<IActionResult> GetKnjiga([FromRoute] int idKnjige)
        {
            try{
                Knjiga knjiga= await Context.Knjige.Include(k => k.Recepti).Where(k => k.ID == idKnjige).FirstOrDefaultAsync();
                return Ok(knjiga);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
            
        }
        
        [Route("AddKnjiga")]
        [HttpPost]
        public async Task<IActionResult> AddKnjiga([FromBody] Knjiga knjiga)
        {
            try{
                Context.Knjige.Add(knjiga);
                await Context.SaveChangesAsync();
                return StatusCode(204);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("UpdateKnjiga")]
        [HttpPut]
        public async Task<IActionResult> UpdateKnjiga([FromBody] Knjiga knjiga)
        {
            try{
                Context.Update<Knjiga>(knjiga);
                await Context.SaveChangesAsync();
                return StatusCode(204);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("DeleteKnjiga/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteKnjiga([FromRoute]int id)
        {
            try{
                var knjiga = await Context.Knjige.FindAsync(id);
                Context.Remove(knjiga);
                await Context.SaveChangesAsync();
                return StatusCode(204);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        #endregion Knjiga

        #region Recept
        [Route("GetRecept/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetRecept([FromRoute] int id)
        {
            try{
                Recept recept= await Context.Recepti.Include(r => r.SastojciRecepta).Where(r => r.ID == id).SingleOrDefaultAsync();
                return Ok(recept);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("GetAllRecepte/{idKnjige}")]
        [HttpGet]
        public async Task<IActionResult> GetAllRecepte([FromRoute]int idKnjige)
        {
            try{
                var recepti = await Context.Recepti.Include(r => r.SastojciRecepta).Where(r => r.KnjigaID == idKnjige).ToListAsync(); 
                return Ok(recepti);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("AddRecept")]
        [HttpPost]
        public async Task<IActionResult> AddRecept([FromBody] Recept recept)
        {
            try{
                IList<Sastojak> sastojci= new List<Sastojak>();
                if(recept.SastojciRecepta!=null)
                {
                    foreach(PripadaReceptu s in recept.SastojciRecepta)
                    {
                        var nadjenS= await Context.Sastojci.FindAsync(s.SastojakID);
                        sastojci.Add(nadjenS);
                    }
                    recept.Kalorije = SracunajKalorije(recept.SastojciRecepta, sastojci);
                }
                Context.Recepti.Add(recept);
                await Context.SaveChangesAsync();
                return StatusCode(204);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

        [Route("UpdateRecept")]
        [HttpPut]
        public async Task<IActionResult> UpdateRecept([FromBody] DTORecept dtoRecept)
        {
            try{
                var helper = new DTOHelper();
                Recept r = helper.DTOToRecept(dtoRecept);
               
                var receptDB= await Context.Recepti.Include(pr => pr.SastojciRecepta).Where(rDB => rDB.ID == r.ID).FirstOrDefaultAsync();
                receptDB.SastojciRecepta.Clear();
                for(var i = 0; i< r.SastojciRecepta.Count; i++)
                {
                    PripadaReceptu pr = new PripadaReceptu();
                    pr.Kolicina = r.SastojciRecepta[i].Kolicina;
                    pr.ReceptID = r.ID;
                    pr.SastojakID = r.SastojciRecepta[i].SastojakID;
                    receptDB.SastojciRecepta.Add(pr);
                }
                receptDB.Naziv=r.Naziv;
                receptDB.Postupak=r.Postupak;
                receptDB.Tezina=r.Tezina;
                receptDB.Vreme=r.Vreme;
                 IList<Sastojak> sastojci= new List<Sastojak>();
                if(r.SastojciRecepta!=null)
                {
                    foreach(PripadaReceptu s in r.SastojciRecepta)
                    {      
                                   
                        
                        var nadjenS= await Context.Sastojci.FindAsync(s.SastojakID);
                        sastojci.Add(nadjenS);
                    }
                    receptDB.Kalorije = SracunajKalorije(r.SastojciRecepta, sastojci);
                }
                Context.Update<Recept>(receptDB);
                
                
                await Context.SaveChangesAsync();
                return StatusCode(204);               
            }
            catch(Exception error)
            {
                if(error.InnerException != null)
                    return StatusCode(500, error.InnerException.Message);
                return StatusCode(500, error.Message);
            }
        }

        [Route("DeleteRecept")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRecept([FromBody]IList<int> id)
        {
            try {
                for(int i=0; i<id.Count();i++)
                {
                    var recept = await Context.Recepti.FindAsync(id[i]);
                    Context.Remove(recept);
                }
            
                await Context.SaveChangesAsync();
                return StatusCode(204);
            }
            catch(Exception ex) { 
                if(ex.InnerException != null)  
                    return StatusCode(500,ex.InnerException.Message);
                return StatusCode(500,ex.Message);
                
            }
                
        }

        [Route("DeleteAllRecept/{idKnjige}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAllRecept([FromRoute] int idKnjige)
        {
            try{
                Context.Recepti.RemoveRange(await Context.Recepti.Where(r => r.KnjigaID == idKnjige).ToListAsync());
                await Context.SaveChangesAsync();
                return StatusCode(204);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }

       
        // [Route("GetAllSastojke/{idRecepta)")]
        // [HttpGet]
        // public async Task<IActionResult> GetAllSastojke([FromRoute] int idRecepta)
        // {
        //    var nesto = await Context.Knjige.ToListAsync();
        //    return Ok(nesto);
        // }

        #endregion Recept

        #region Sastojak 
        [Route("GetAllSastojke")]
        [HttpGet]
        public async Task<IActionResult> GetAllSastojke()
        {
            try{
                var sastojci = await Context.Sastojci.ToListAsync();
                return Ok(sastojci);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
           
        }
        [Route("GetSastojak/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSastojak([FromRoute]int id)
        {
            try{
                var sastojak = await Context.Sastojci.FindAsync(id);
                return Ok(sastojak);
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
           
        }

        [Route("AddSastojak")]
        [HttpPost]
        public async Task<IActionResult> AddSastojak([FromBody] Sastojak sastojak)
        {
            try{
                Context.Sastojci.Add(sastojak);
                await Context.SaveChangesAsync();
                return StatusCode(204);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }
        [Route("DeleteSastojak/{idSastojka}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSastojak([FromRoute] int idSastojka)
        {
            try{
                var sastojak = await Context.Sastojci.FindAsync(idSastojka);
                Context.Remove(sastojak);
                await Context.SaveChangesAsync();
                return StatusCode(204);               
            }
            catch(Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }
        
        #endregion Sastojak
        
        #region PrivatneFunkcije
        private double SracunajKalorije(IList<PripadaReceptu> sastojciRecept, IList<Sastojak> sastojciDB) 
        {

            double kalorije=0;
            for(int i=0; i<sastojciRecept.Count; i++)
            {
                if(sastojciDB[i].MernaJedinica == "komad")
                {
                    kalorije+= sastojciDB[i].Kalorije*sastojciRecept[i].Kolicina;
                }
                else if(sastojciDB[i].MernaJedinica == "g"|| sastojciDB[i].MernaJedinica == "ml")
                {
                    kalorije+= (sastojciDB[i].Kalorije*sastojciRecept[i].Kolicina)/100;
                }
            }
            return kalorije;
        }
        #endregion PrivatneFunkcije

    }
}
