export class Knjiga{
    constructor(id,ime,opis, recepti){
        this.id= id;
        this.naziv =ime;
        this.kratakOpis =opis;
        this.brRecept=null;
        this.recepti=recepti;

        this.selectedReceptID=-1; //id recepta koji treba da se izbaci iz liste recepta knjige
    }
    addRecept(r){
        this.recepti.push(r);
        this.brRecept++;
    }
    removeRecept(){
        let t=this;
        let r={};
        this.recepti= this.recepti.filter(el=>{
            if(el.id == t.selectedReceptID)
            { 
                r = el;
                return false;
            }
            return true;
        })
        this.brRecept--;
        return r;

    }
    
}