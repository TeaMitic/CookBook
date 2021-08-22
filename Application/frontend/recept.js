export class Recept {
    constructor(id,naziv, postupak, tezina, vreme, knjigaId, sastojci, kalorije){
        this.id= id;
        this.naziv =naziv;
        this.postupak =postupak;
        this.tezina=tezina;
        this.vreme = vreme;
        this.kalorije=kalorije;
        this.knjigaID=knjigaId;
        this.sastojciRecepta =sastojci;
        // this.kolicinaSastojka = kolicinaSastojka
    }
}