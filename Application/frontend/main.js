import {Knjiga} from "./knjiga.js"
import {Recept} from "./recept.js"
import {Sastojak} from "./sastojak.js"
import {Api} from "./Api.js";

let indexSelect =0;
let receptiForDelete=[];
let izabraniSastojci= [];
let trenutniRecept;
// var knjige=[];
// var recepti=[];
// var sastojci=[];

crtajNavBar();
crtajStranu();

function crtajNavBar(){
    let divNav = document.createElement("div");
    divNav.className="nav";
    var image= document.createElement("img");
    image.src="logo.png"
    image.alt="logo";
    image.className="img";
    divNav.appendChild(image);

    // divNav.innerHTML="CookBook";
    document.body.appendChild(divNav);
}

function crtajStranu(){
    let container = document.createElement("div");
    container.className="container";
    let divLevo= document.createElement("div");
    divLevo.className="divLevo";
    let divDesno= document.createElement("div");
    divDesno.className="divDesno";
    // divLevo.innerHTML="Levi div";
    // divDesno.innerHTML="Desni div";   
    document.body.appendChild(container);
    container.appendChild(divLevo);
    container.appendChild(divDesno);
    
    crtajLeviDiv(divLevo);
    crtajDesniDiv(divDesno);
   
}

function crtajLeviDiv(host){
//elementi za divKnj - info knjige, select tag i dugmici
    let divKnj=document.createElement("div"); 
    divKnj.className="divKnjige"; 
    selectTagKnjiga(divKnj);
    host.appendChild(divKnj);    

    let dodajKnj=document.createElement("button");
    dodajKnj.innerHTML="Dodaj knjigu";
    dodajKnj.className="knjigeButton";
    divKnj.appendChild(dodajKnj);
    dodajKnj.addEventListener("click", dodajKnjigu);

    let izmeniKnj=document.createElement("button");
    izmeniKnj.innerHTML="Izmeni knjigu";
    izmeniKnj.classList.add("knjigeButton")
    divKnj.appendChild(izmeniKnj);
    izmeniKnj.addEventListener("click", izmeniKnjigu);

    let infoKnj= document.createElement("p");
    infoKnj.className="infoKnjige";
    divKnj.appendChild(infoKnj);

//element div za drugi info knjige - lista recepata i dugmici za dodaj i izbrisi recept
    let divReceptKnj = document.createElement("div");
    divReceptKnj.className="divReceptKnj";
    host.appendChild(divReceptKnj); 
    
    let divListRecepta=document.createElement("div");
    divListRecepta.className="divListaRecepta";
    // let sastojciR = document.createElement("p");
    // sastojciR.innerHTML="khhhhddddd ddddddddhhhh fffffffff ffffffffffff  fffffff njsfen jdncowne odsnvcowfdnc osdnicoiwnfe dncikn";
    // divListRecepta.innerHTML=""
    //divListRecepta.appendChild(sastojciR);
    divListRecepta.classList.add("hideShow");

    divReceptKnj.appendChild(divListRecepta);
    // crtajListuRecepata(divListRecepta);
   
    let divButton= document.createElement("div");
    divButton.className="divReceptDugme"
    divButton.classList.add("hideShow")
    let dodajRecept=document.createElement("button");
    dodajRecept.innerHTML="Dodaj recept";
    dodajRecept.className="knjigeButton";
    divButton.appendChild(dodajRecept);
    dodajRecept.addEventListener("click", dodajReceptFunc);

    let izbrisiRecept=document.createElement("button");
    izbrisiRecept.innerHTML="Izbrisi recept";
    izbrisiRecept.classList.add("knjigeButton");
    izbrisiRecept.addEventListener("click", obrisiRecept);
    divButton.appendChild(izbrisiRecept);

    divReceptKnj.appendChild(divButton);

//elementi za divNovaKnjiga
    let divNovaKnjiga= document.createElement("div");
    divNovaKnjiga.className="divNovaKnjiga";
    divNovaKnjiga.classList.add("hideShow");
    divNovaKnjiga.style.display="none";
    host.appendChild(divNovaKnjiga);

    let pomDiv= document.createElement("div");
    pomDiv.className="pomdiv";

    let inputNaziv= document.createElement("input");
    inputNaziv.className="inputNaziv"
    inputNaziv.placeholder="Naziv";
    pomDiv.appendChild(inputNaziv);

    let inputOpis= document.createElement("input");
    inputOpis.className="inputOpis"
    inputOpis.placeholder="Kratak opis";
    pomDiv.appendChild(inputOpis);

    divNovaKnjiga.appendChild(pomDiv);

    let dugmeDodaj= document.createElement("button");
    dugmeDodaj.className="dugmeDodajKnj";
    dugmeDodaj.innerHTML="Dodaj novu knjigu";
    dugmeDodaj.addEventListener("click", dodajKnjiguDB);
    divNovaKnjiga.appendChild(dugmeDodaj); 
    // dugmeDodaj.style.display="none";

    
    let dugmeIzmeni= document.createElement("button");
    dugmeIzmeni.className="dugmeDodajKnj";
    dugmeIzmeni.classList.add("dugmeIzmeniKnj");
    dugmeIzmeni.innerHTML="Izmeni knjigu";
    dugmeIzmeni.addEventListener("click", IzmeniKnjiguDB);
    divNovaKnjiga.appendChild(dugmeIzmeni); 
    dugmeIzmeni.style.display="none";
    
}

function crtajDesniDiv(host){
//elementi za info recepta - ime, kalorije, vreme spremanja
    let divInfoRecepta = document.createElement("div");
    divInfoRecepta.className="divInfoRecepta";
    host.appendChild(divInfoRecepta);

    let inputNaziv = document.createElement("input");
    inputNaziv.className="knjigeKalNazivVreme";
    inputNaziv.classList.add("inputNazivRecepta");
    inputNaziv.placeholder ="ime recepta";
    inputNaziv.readOnly = true;
    inputNaziv.type = "text";
    divInfoRecepta.appendChild(inputNaziv);

    let divTezina=document.createElement("div");
    divTezina.className="divKalorijeVreme"
    
    let tezina = document.createElement("label");
    tezina.setAttribute("for","tezinaID");
    tezina.innerText="tezina spremanja:";
    tezina.className="labelaVremeKal";
    divTezina.appendChild(tezina);
    let inputTezina= document.createElement("input");
    inputTezina.className="knjigeKalNazivVreme";
    inputTezina.classList.add("inputTezinaRecepta");
    inputTezina.id="tezinaID";
    inputTezina.placeholder ="tezina";
    inputTezina.readOnly = true;
    inputTezina.type = "text";
    divTezina.appendChild(inputTezina);
    divInfoRecepta.appendChild(divTezina);

    let divKalorije=document.createElement("div");
    divKalorije.className="divKalorijeVreme"
    
    let kalorije = document.createElement("label");
    kalorije.setAttribute("for","kalorijeID");
    kalorije.innerText="kalorije:";
    kalorije.className="labelaVremeKal";
    divKalorije.appendChild(kalorije);
    let inputKalorije= document.createElement("input");
    inputKalorije.className="knjigeKalNazivVreme";
    inputKalorije.classList.add("inputKalorijeRecepta");
    inputKalorije.id="kalorijeID";
    inputKalorije.placeholder ="kalorije";
    inputKalorije.readOnly = true;
    inputKalorije.type = "text";
    divKalorije.appendChild(inputKalorije);
    divInfoRecepta.appendChild(divKalorije);

    let divVreme=document.createElement("div");
    divVreme.classList.add("divKalorijeVreme");

    let vreme = document.createElement("label");
    vreme.setAttribute("for","vremeID");
    vreme.innerText="vreme spremanja:";
    vreme.className="labelaVremeKal";
    divVreme.appendChild(vreme);
    let inputVreme= document.createElement("input");
    inputVreme.className="knjigeKalNazivVreme";
    inputVreme.classList.add("inputVremeRecepta");
    inputVreme.id="vremeID";
    inputVreme.placeholder ="vreme";
    inputVreme.readOnly = true;
    inputVreme.type = "text";
    divVreme.appendChild(inputVreme);
    divInfoRecepta.appendChild(divVreme);
    
//elementi za div lista sastojka - lista sastojka
    let sastojciR = document.createElement("h3");
    sastojciR.innerHTML="sastojci za recept";

    let divSastojka =document.createElement("div");
    divSastojka.className="divSastojka";

    let pomDivSastojci= document.createElement("div");
    pomDivSastojci.className="pomDivSastojka";
    pomDivSastojci.style.display="flex";
    divSastojka.appendChild(pomDivSastojci);

    let divIzabraniSastojci= document.createElement("div");
    divIzabraniSastojci.className="divSastojka";
    divIzabraniSastojci.classList.add("divIzabraniSastojci");
    // divIzabraniSastojci.innerHTML="ovde ide lista sastojaka koji su izabrani"
    pomDivSastojci.appendChild(divIzabraniSastojci);

    let divListaSastojka= document.createElement("div");
    divListaSastojka.className="divSastojka";
    divListaSastojka.classList.add("divListaSastojka");
    // divListaSastojka.innerHTML="ovde ide lista sastojaka iz baze"
    pomDivSastojci.appendChild(divListaSastojka);

    // crtajListuSastojka();

//elementi za divDodajSastojak 
    let divDodajSastojak = document.createElement("div");
    divDodajSastojak.className="divDodajSastojak";
    // divDodajSastojak.classList.add("divSastojka");

    let inputNazivSastojka=document.createElement("input");
    inputNazivSastojka.className="inputNazivSastojka";
    inputNazivSastojka.placeholder="Naziv sastojka";
    inputNazivSastojka.classList.add("knjigeKalNazivVreme");

    let inputKalorijeSastojka=document.createElement("input");
    inputKalorijeSastojka.className="inputKalorijeSastojka";
    inputKalorijeSastojka.placeholder="Kalorije sastojka";
    inputKalorijeSastojka.classList.add("knjigeKalNazivVreme");

    let selectMernaJed = document.createElement("select");
    selectMernaJed.className="selectMernaJed";
    selectMernaJed.classList.add("knjigeList");
    let option0 = document.createElement("option");
    option0.text="...";
    selectMernaJed.appendChild(option0);
    let option1 = document.createElement("option");
    option1.value = "komad";
    option1.text = "komad";
    selectMernaJed.appendChild(option1);
    let option2 = document.createElement("option");
    option2.value = "g";
    option2.text = "g";
    selectMernaJed.appendChild(option2);
    let option3 = document.createElement("option");
    option3.value = "ml";
    option3.text = "ml";
    selectMernaJed.appendChild(option3);

    let dugmeDodajSastojak=document.createElement("button");
    dugmeDodajSastojak.className="dodajSastojak";
    dugmeDodajSastojak.innerHTML="Dodaj sastojak";
    dugmeDodajSastojak.classList.add("knjigeButton");
    dugmeDodajSastojak.addEventListener("click", dodajSastojak);

    divDodajSastojak.appendChild(inputNazivSastojka);
    divDodajSastojak.appendChild(inputKalorijeSastojka);
    divDodajSastojak.appendChild(selectMernaJed);
    divDodajSastojak.appendChild(dugmeDodajSastojak);

   

    divDodajSastojak.style.display="none";
    pomDivSastojci.style.display="none";
    
   // divSastojka.innerHTML="u div sastojka idu sastojci za biranje(checkbox) i mesto za upis gramaze"
    //u div sastojka idu sastojci za biranje(checkbox) i mesto za upis gramaze
    host.appendChild(divSastojka);
    divSastojka.appendChild(sastojciR);
    host.appendChild(divDodajSastojak);

//elementi za div postupak - postupak tekst
    let postupak = document.createElement("h3");
    postupak.innerHTML="postupak za recept";

    let divPostupak = document.createElement("div");
    divPostupak.className="divPostupak";
    let inputPostupak = document.createElement("textarea");
    inputPostupak.className="inputPostupak";
    // inputPostupak.type="text";
    inputPostupak.readOnly="true";
    // divPostupak.innerHTML="u div postupak treba da pise postupak pravljenja recepta";
    host.appendChild(divPostupak);
    divPostupak.appendChild(postupak);
    divPostupak.appendChild(inputPostupak);

    let izmeniRecept=document.createElement("button");
    izmeniRecept.innerHTML="Izmeni recept";
    izmeniRecept.className="izmeniReceptDugme";
    izmeniRecept.addEventListener("click", izmeniReceptDB);
    host.appendChild(izmeniRecept);
    izmeniRecept.style.display="none";

    let dodajRecept=document.createElement("button");
    dodajRecept.innerHTML="Dodaj recept";
    dodajRecept.className="izmeniReceptDugme";
    dodajRecept.classList.add("dodajReceptDugme");
    dodajRecept.addEventListener("click", dodajReceptDB);
    host.appendChild(dodajRecept);
    dodajRecept.style.display="none";
    
}

async function prikaziInfoKnj(){
    let divReceptKnjige=document.querySelector(".divReceptKnj");
    divReceptKnjige.style.display="flex";
    //lista se izvlaci iz back-a, tj. dolazi uz obj knjige
    let api = new Api();
    var knjige= await api.GetAllKnjige();

    //var array1 = ["opis knjige","slavski kolaci","torte za sve prilike","jela 30min","italijanski nacin zivota"];
    let selectObj = document.querySelector(".knjigeList");
    let infoKnj= document.querySelector(".infoKnjige");
    if(selectObj.selectedIndex !==0)
    {
        infoKnj.innerHTML=knjige[selectObj.selectedIndex-1].kratakOpis; 
    }
    else{
        infoKnj.innerHTML="";
        refreshDesniDiv("izaberiKnjigu");
    }
    let divReceptKnj = document.querySelector(".divReceptKnj");
    indexSelect=selectObj.selectedIndex;   
    if(indexSelect !==0)
    {
        receptiKnjige(divReceptKnj);
    } 
    else{
        indexSelect=0;
        let divReceptListe=document.querySelector(".divListaRecepta");
        divReceptListe.style.display="none";

        let divKnjige=document.querySelector(".divKnjige");
        divKnjige.style.alignContent = "flex-start";
    
        let divButton = document.querySelector(".divReceptDugme");
        divButton.style.display="none";

        let divNovaKnjiga=document.querySelector(".divNovaKnjiga");
        divNovaKnjiga.style.display="none";

    }
}
function receptiKnjige(host){
    //podaci treba da se izvlace iz baze
    let divKnjige=document.querySelector(".divKnjige");
    divKnjige.style.alignContent = "stretch";

    let divReceptListe=document.querySelector(".divListaRecepta");
    divReceptListe.style.display="block";
    crtajListuRecepata(divReceptListe);

    let divButton = document.querySelector(".divReceptDugme");
    divButton.style.display="block";

    let divNovaKnjiga=document.querySelector(".divNovaKnjiga");
    divNovaKnjiga.style.display="none";

}

async function selectTagKnjiga(divKnj)
{
    var selectKnj = document.createElement("select");
    selectKnj.id="knjige";
    selectKnj.className="knjigeList";
    //ovde treba sa back-a da se povuku podaci
    var option = document.createElement("option");
    option.value="";
    option.text="Izaberi knjigu";
    selectKnj.appendChild(option);
    let api = new Api();
    var knjige= await api.GetAllKnjige();
    //var array = ["Izaberi knjigu","Kolaci","Torte","Kuvana jela","Paste"];
    knjige.forEach(element => {
        var option = document.createElement("option");
        option.value = element.id;
        option.text = element.naziv;
        selectKnj.appendChild(option);
    });
    selectKnj.onfocus="this.selectedIndex=0"
    let index = selectKnj.selectedIndex;
    selectKnj.onchange=prikaziInfoKnj;
    divKnj.appendChild(selectKnj);
}

function dodajKnjigu(){
    let host= document.querySelector(".divLevo");
    let divReceptKnjige=document.querySelector(".divReceptKnj");
    divReceptKnjige.style.display="none";

    //forma da dodavanje info za novu knjigu
    let divNovaKnjiga=document.querySelector(".divNovaKnjiga");
    divNovaKnjiga.style.display="flex";
    
    let dugmeDodaj = document.querySelector(".dugmeDodajKnj");
    dugmeDodaj.style.display="flex";
    let dugmeIzmeni=document.querySelector(".dugmeIzmeniKnj");
    dugmeIzmeni.style.display="none";


    // dodajKnjiguDB();

    //pribavljanje elemenata
    


    //ovde kad se klikne na dugme dodaj knjigu treba divNovaKNjiga da se sakrije i da se u select tagu pojavi nova dodata knjiga


} 
async function dodajKnjiguDB(){
    let inputNaziv=document.querySelector(".inputNaziv");
    let inputOpis=document.querySelector(".inputOpis");
    // let dugmeDodaj=document.querySelector(".dugmeDodajKnj");
    let divKnj=document.querySelector(".divKnjige");
    console.log(divKnj);
    
    
    if(inputNaziv.value !== "" || inputOpis.value !== "")
    {
        let knjiga= new Knjiga(0,inputNaziv.value,inputOpis.value, null);
        console.log(knjiga);
        
        let api= new Api();
        let yes = await api.AddNovuKnjigu(knjiga);
        if(yes)
        {
            location.reload();
        }
        
        // return false;
        //selectTagKnjiga(divKnj);        
    }
    else{
        alert("Nisu popunjenja sva potrebna polja (naziv, opis)");
    }


}

async function izmeniKnjigu(){
    //prvo divNovaKnjiga iskoristi, ali umesto dugmetaDodajKnjigu stavi dugmeIzmeniKnjigu (koristi hideShow resenje) i na to dugme postavi event da se izmeni knjiga
    //pre promene knjige, mora da se izabere knjiga iz select taga, u suprotnom alert poruka
    //kada se izabere knjiga prikazuje se divNovaKnjiga sa izmeniKNjigu dugmetom i iz inputNaziv i inputOpis se prvo stave vrednosti iz selectTaga, a onda mogu da se promene
    //znaci, prvo GetKnjigu sa id iz izabranog option-a iz selectTaga, a onda naziv i opis se ubacuju kao initial value u input tagove i onda izmenom se salju u bazu UpdateKnjgu
    let divReceptKnjige=document.querySelector(".divReceptKnj");
    divReceptKnjige.style.display="none";
    let divNovaKnjiga=document.querySelector(".divNovaKnjiga");
    let dugmeDodaj = document.querySelector(".dugmeDodajKnj");
    let dugmeIzmeni=document.querySelector(".dugmeIzmeniKnj");
    let inputNaziv=document.querySelector(".inputNaziv");
    let inputOpis=document.querySelector(".inputOpis");

    let selectTag= document.querySelector(".knjigeList");
    let knjigaID;
    if(selectTag.selectedIndex !== 0)
    {        
        divNovaKnjiga.style.display="flex";        
        dugmeDodaj.style.display="none";        
        dugmeIzmeni.style.display="flex";

        knjigaID= parseInt(selectTag.options[selectTag.selectedIndex].value);
        let api= new Api();
        let knjiga=await api.GetKnjigu(knjigaID);
        inputNaziv.value =`${knjiga.naziv}`;
        inputOpis.value=`${knjiga.kratakOpis}`;       
    }
    else{
        alert("Niste izabrali knjigu koju zelite da izmenite");
    }   
}
async function IzmeniKnjiguDB(){
    let inputNaziv=document.querySelector(".inputNaziv");
    let inputOpis=document.querySelector(".inputOpis");
    let selectTag= document.querySelector(".knjigeList");
    let knjigaID;
    knjigaID= parseInt(selectTag.options[selectTag.selectedIndex].value);
    let api= new Api();
    let knjiga=await api.GetKnjigu(knjigaID);
    if(inputNaziv.value == "")
    {
        alert("Nije popunjen naziv knjige!");
        return;
    }
    if(inputOpis.value == "")
    {
        alert("Nije popunjen opis knjige!");
        return;
    }
    knjiga.naziv= inputNaziv.value;
    knjiga.kratakOpis = inputOpis.value;
    let yes = await api.UpdateKnjigu(knjiga);
    if(yes)
    {
        location.reload();
    }

}

async function crtajListuRecepata(divListaRecepta){
    //obrisi sve divove sa klasom divReceptIzListe
    let sviRecepti= document.querySelectorAll(".divReceptIzListe");
    for(let i=0; i<sviRecepti.length; i++)
    {
        sviRecepti[i].remove();
    }    
    //pribavi listu recepata knjige
    let knjigaID;
    let selectKnjiga=document.querySelector(".knjigeList");
    if(selectKnjiga.selectedIndex!== 0)
    {
         knjigaID= parseInt(selectKnjiga.options[selectKnjiga.selectedIndex].value);
    }

    let api= new Api();
    let receptiKnjige= await api.GetAllRecepteKnjige(knjigaID);
    //kroz for petlju napravi zasebne divove za svaki recept stavi da budu iste klase da bi mogla da ih obrises, ali id stavi da im bude id recepta za kasnije
    for(let i=0;i<receptiKnjige.length;i++)
    {
        let divReceptIzListe=document.createElement("div");
        divReceptIzListe.className="divReceptIzListe";
        divReceptIzListe.id=receptiKnjige[i].id;
        divReceptIzListe.addEventListener("click", x => {
            let ostaliDivovi = document.querySelectorAll(".divReceptIzListe");
            for(let ost of ostaliDivovi) {
                ost.style.backgroundColor = "#fcaa8c";
            }
            divReceptIzListe.style.backgroundColor = "#89241f85";
            divReceptIzListe.style.transition = "0.18s";
            trenutniRecept=receptiKnjige[i].id;
            prikaziInfoRecepta(receptiKnjige[i].id);
            // divKratakInfoRecepta.style.borderRadius = "2.8vw"
            // divKratakInfoRecepta.style.backgroundColor="rgb(0,255,0)";
        })
       

        let divCheckBox= document.createElement("div");
        divCheckBox.className="divCheckBox";
        let divKratakInfoRecepta= document.createElement("div");
        divKratakInfoRecepta.className="divKratakInfoRecepta";
        
        let naziv= document.createElement("h4");
        let vreme =document.createElement("p");
        let kalorije=document.createElement("p");
        let tezina=document.createElement("p");
        naziv.innerHTML=`${receptiKnjige[i].naziv}`;
        vreme.innerHTML=`Vreme spremanja: ${receptiKnjige[i].vreme}`;
        kalorije.innerHTML=`Kalorije: ${receptiKnjige[i].kalorije}`;
        tezina.innerHTML=`Tezina spremanja: ${receptiKnjige[i].tezina}`;
        divKratakInfoRecepta.appendChild(naziv);
        divKratakInfoRecepta.appendChild(vreme);
        divKratakInfoRecepta.appendChild(kalorije);
        divKratakInfoRecepta.appendChild(tezina);
        //divKratakInfoRecepta.innerHTML="Kratak opis recepta"
        let chechbox= document.createElement("input");
        chechbox.type="checkbox";
        //chechbox.parentElement.id;
        // console.log(chechbox.parentElement.id);
        chechbox.addEventListener("change", fun => {
            cekiraniRecepti(chechbox);
        });
        divCheckBox.appendChild(chechbox);
        divReceptIzListe.appendChild(divCheckBox);
        divReceptIzListe.appendChild(divKratakInfoRecepta);

        divListaRecepta.appendChild(divReceptIzListe);

    }   
    //chechbox.parentElement i pribavim id recepta koji treba da se posle obrise ili prikaze za izmenu
}

async function crtajListuSastojka(){
    let sviSastojci= document.querySelectorAll(".divSastojciDB");
    for(let i=0; i<sviSastojci.length; i++)
    {
        sviSastojci[i].remove();
    }   

    let divListaSastojka= document.querySelector(".divListaSastojka");

    let api = new Api();
    let sastojci= await api.GetAllSastojke();
    for(let i=0;i<sastojci.length;i++)
    {
        // debugger
        let divSastojciDB=document.createElement("div");
        divSastojciDB.className="divSastojciDB";
        divSastojciDB.id=sastojci[i].id;

        let labela= document.createElement("label");
        labela.className="labelaVremeKal"
        labela.innerHTML=`${sastojci[i].naziv}`;
        let chechbox= document.createElement("input");
        chechbox.type="checkbox";
        chechbox.className="inputCheckbox"
        chechbox.style.alignSelf="center";
        //chechbox.innerText=`${sastojci[i].naziv}`;
        //labela.appendChild(chechbox);

        let inputKolicina= document.createElement("input");
        inputKolicina.placeholder="kolicina";
        inputKolicina.className="inputKolicina";
        inputKolicina.classList.add("knjigeKalNazivVreme");

        divSastojciDB.appendChild(chechbox);
        divSastojciDB.appendChild(labela);
        divSastojciDB.appendChild(inputKolicina);

        chechbox.addEventListener("change", fun => {
            
            cekiraniSastojci(chechbox, inputKolicina.value, labela.innerHTML, sastojci[i].mernaJedinica);
        });

        divListaSastojka.appendChild(divSastojciDB);


    }
    // for{
        
}
    
function cekiraniRecepti(checkbox)
    {
        if(checkbox.checked){
            
            receptiForDelete.push(checkbox.parentElement.parentElement.id);
        }
        else{
            receptiForDelete = receptiForDelete.filter(el => el != checkbox.parentElement.parentElement.id);
        }
        console.log(receptiForDelete)
        
}
function cekiraniSastojci(chechbox, kolicina, naziv, merJ){
        let divIzabraniSastojci= document.querySelector(".divIzabraniSastojci");
        let linija= document.createElement("h4");
        linija.className="linijaIzabraniSastojak";
       
        if(chechbox.checked){
            let obj={
                id : chechbox.parentElement.id,
                naziv : naziv,
                kolicina : kolicina,
                jed: merJ
            }
            izabraniSastojci.push(obj);
            linija.innerHTML=`${obj.naziv} ${obj.kolicina} ${obj.jed}`;
            linija.id=obj.id;
            divIzabraniSastojci.appendChild(linija);
        }
        else{
            let linije = document.querySelectorAll(".linijaIzabraniSastojak");
            let l;
            for(let lin of linije)
            {
                if(lin.id == chechbox.parentElement.id)
                {
                    l=lin;
                }
            }
            l.remove();
            izabraniSastojci = izabraniSastojci.filter(el => el.id != chechbox.parentElement.id);
        }
        console.log(izabraniSastojci);
    
}
async function obrisiRecept(){

    let divListaRecepta=document.querySelector(".divListaRecepta")
    let api = new Api();
    let yes = await api.DeleteRecepte(receptiForDelete);
    if(yes)
    {
        crtajListuRecepata(divListaRecepta);
        receptiForDelete=[];
        console.log(receptiForDelete);
    }

    refreshDesniDiv("obrisiRecept");


}

async function dodajReceptFunc(){
    let dodajDugme= document.querySelector(".dodajReceptDugme");
    let izmeniRecept= document.querySelector(".izmeniReceptDugme");
    izmeniRecept.style.display="none";
    let divDodajSastojak=document.querySelector(".divDodajSastojak");
    let pomDivSastojci= document.querySelector(".pomDivSastojka");
    let inputNazivRecepta=document.querySelector(".inputNazivRecepta");
    let inputVremeRecepta=document.querySelector(".inputVremeRecepta");
    let inputTezinaRecepta= document.querySelector(".inputTezinaRecepta");
    let inputPostupak=document.querySelector(".inputPostupak");
    let inputKalorijeRecepta=document.querySelector(".inputKalorijeRecepta");

    inputKalorijeRecepta.value="";
    inputPostupak.value="";
    inputPostupak.readOnly=false;
    inputNazivRecepta.value="";
    inputNazivRecepta.readOnly=false;
    inputVremeRecepta.value="";
    inputVremeRecepta.readOnly=false;
    inputTezinaRecepta.readOnly=false;
    inputTezinaRecepta.value="";
    dodajDugme.style.display="inline-block";
    pomDivSastojci.style.display="flex";
    divDodajSastojak.style.display="flex";

    let linije = document.querySelectorAll(".linijaIzabraniSastojak");
    for(let lin of linije)
    {
        lin.remove();
    }

    izabraniSastojci=[];

    crtajListuSastojka();
    
    //na desnoj strani treba da se "otkljucaju" sve komponente (input box-ovi, postupak), 
    //treba i da se napravi spisak sastojaka i mogucnost da se doda novi sastojak, to sve u divSastojka
}

async function dodajReceptDB(){
    let divListaRecepta=document.querySelector(".divListaRecepta");
    let postupak= document.querySelector(".inputPostupak");
    let naziv = document.querySelector(".inputNazivRecepta");
    let vreme = document.querySelector(".inputVremeRecepta");
    let tezina= document.querySelector(".inputTezinaRecepta");
    let knjiga = document.querySelector(".knjigeList");
    let knjigaID= parseInt(knjiga.options[knjiga.selectedIndex].value);
    let sastojciRecepta=[];
    debugger
    for(let i=0;i< izabraniSastojci.length;i++)
    {
        let sastojak={
            sastojakID : izabraniSastojci[i].id,
            kolicina : izabraniSastojci[i].kolicina,
        }
        sastojciRecepta.push(sastojak);
    }

    if(postupak.value !== "" && naziv.value !== "" && vreme.value !== "" && tezina.value !== "" && izabraniSastojci.length > 0)
    {
        let noviRecept= new Recept(0,naziv.value,postupak.value,tezina.value,vreme.value,knjigaID,sastojciRecepta);
        let api = new Api();
        let yes = await api.AddRecept(noviRecept);
        if(yes)
        {
            await crtajListuRecepata(divListaRecepta);
            izabraniSastojci=[];
            let linije = document.querySelectorAll(".linijaIzabraniSastojak");
            for(let lin of linije)
            {                
                lin.remove();                
            }
            naziv.value="";
            postupak.value="";
            vreme.value="";
            tezina.value="";
            let sviSastojci= document.querySelectorAll(".divSastojciDB");
            let kolicina;
            let checkbox;
            for(let i=0; i<sviSastojci.length; i++)
            {
                    kolicina = sviSastojci[i].querySelector(".inputKolicina");
                    checkbox = sviSastojci[i].querySelector(".inputCheckbox");
                    kolicina.value= "";
                    checkbox.checked=false;
            }

            
        }
    }
    else{
        alert("Niste popunili sva potrebna polja (naziv, vreme, postupak, sastojci)");
    }
}

async function dodajSastojak(){
    let selectMernaJed=document.querySelector(".selectMernaJed");
    let inputNazivS= document.querySelector(".inputNazivSastojka");
    let inputKalorijeS= document.querySelector(".inputKalorijeSastojka");

    if(inputNazivS.value !== "" && inputKalorijeS.value !== "" && selectMernaJed.selectedIndex !== 0)
    {
        let sastojak = new Sastojak(0,inputNazivS.value,inputKalorijeS.value,selectMernaJed.options[selectMernaJed.selectedIndex].value);
        let api = new Api();
        let yes= await api.AddSastojak(sastojak);
        if(yes){
            debugger
            await crtajListuSastojka();
            let sviSastojci= document.querySelectorAll(".divSastojciDB");
            let kolicina;
            let checkbox;
            for(let i=0; i<sviSastojci.length; i++)
            {
                let s = izabraniSastojci.find(el => el.id == sviSastojci[i].id);
                if(s != undefined)
                {
                    kolicina = sviSastojci[i].querySelector(".inputKolicina");
                    checkbox = sviSastojci[i].querySelector(".inputCheckbox");
                    kolicina.value= s.kolicina;
                    checkbox.checked=true;
                }
            }
        }
    }
    else{
        alert("Nisu popunjena sva polja");
    }

    

    selectMernaJed.selectedIndex=0;
    inputNazivS.value="";
    inputKalorijeS.value="";
}
async function prikaziInfoRecepta(idRecepta){
    let dodajDugme= document.querySelector(".dodajReceptDugme");
    dodajDugme.style.display="none";
    let linije = document.querySelectorAll(".linijaIzabraniSastojak");
    for(let lin of linije)
    {
        lin.remove();
    }
    let api = new Api();
    let recept = await api.GetRecept(idRecepta);
    // debugger
    crtajListuSastojka();

    let pomDivSastojci= document.querySelector(".pomDivSastojka");
    let divDodajSastojak=document.querySelector(".divDodajSastojak");
    pomDivSastojci.style.display="flex";
    divDodajSastojak.style.display="flex";
    
//upisani sastojci recepta
    let divIzabraniSastojci= document.querySelector(".divIzabraniSastojci");
    let sastojci=[];
    for(let i=0; i<recept.sastojciRecepta.length;i++)
    {
        // debugger
        let sastojak= await api.GetSastojak(recept.sastojciRecepta[i].sastojakID);
        let obj={
            id : sastojak.id,
            naziv : sastojak.naziv,
            kolicina : recept.sastojciRecepta[i].kolicina,
            jed: sastojak.mernaJedinica
        }
        sastojci.push(obj);

        let linija= document.createElement("h4");
        linija.className="linijaIzabraniSastojak";
        linija.innerHTML=`${sastojak.naziv} ${recept.sastojciRecepta[i].kolicina} ${sastojak.mernaJedinica}`;
        linija.id=sastojak.id;
        divIzabraniSastojci.appendChild(linija);
    }
    izabraniSastojci=sastojci;
    let sviSastojci= document.querySelectorAll(".divSastojciDB");
    let kolicina;
    let checkbox;
    for(let i=0; i<sviSastojci.length; i++)
    {
        let s = recept.sastojciRecepta.find(el => el.sastojakID == sviSastojci[i].id);
        if(s != undefined)
        {
            kolicina = sviSastojci[i].querySelector(".inputKolicina");
            checkbox = sviSastojci[i].querySelector(".inputCheckbox");
            kolicina.value= s.kolicina;
            checkbox.checked=true;
        }
    }
//upisan postupak, nazi, vreme, tezina, kalorije
    let postupak= document.querySelector(".inputPostupak");
    let naziv = document.querySelector(".inputNazivRecepta");
    let vreme = document.querySelector(".inputVremeRecepta");
    let tezina= document.querySelector(".inputTezinaRecepta");
    let kalorije=document.querySelector(".inputKalorijeRecepta");

    postupak.readOnly=false;
    naziv.readOnly=false;
    vreme.readOnly=false;
    tezina.readOnly=false;

    postupak.value= recept.postupak;
    naziv.value=recept.naziv;
    vreme.value= recept.vreme;
    tezina.value= recept.tezina;
    kalorije.value= recept.kalorije;

    let izmeniRecept= document.querySelector(".izmeniReceptDugme");
    izmeniRecept.style.display="inline-block";




}
async function izmeniReceptDB(){
    //prikupi sve nove podatke u obj recept, api poziv
    //refresuj listuRecepata
    let divListaRecepta=document.querySelector(".divListaRecepta");
    let postupak= document.querySelector(".inputPostupak").value;
    let naziv = document.querySelector(".inputNazivRecepta").value;
    let vreme = document.querySelector(".inputVremeRecepta").value;
    let kalorije = document.querySelector(".inputKalorijeRecepta").value;
    let tezina= document.querySelector(".inputTezinaRecepta").value;
    let knjiga = document.querySelector(".knjigeList");
    let knjigaID= parseInt(knjiga.options[knjiga.selectedIndex].value);
    let sastojciRecepta=[];
    for(let i=0;i< izabraniSastojci.length;i++)
    {
        let sastojak={
            receptID: trenutniRecept,
            sastojakID : izabraniSastojci[i].id,
            kolicina : izabraniSastojci[i].kolicina,
        }
        sastojciRecepta.push(sastojak);
    }

    if(postupak !== "" && naziv !== "" && vreme !== "" && tezina !== "" && izabraniSastojci.length > 0)
    {
        let noviRecept= new Recept(trenutniRecept,naziv,postupak,tezina,vreme,knjigaID,sastojciRecepta);
        noviRecept.kalorije=kalorije;
        let api = new Api();
        let yes = await api.UpdateRecept(noviRecept);
    // debugger

        if(yes)
        {
            crtajListuRecepata(divListaRecepta);
            //izabraniSastojci=[];
        }
    }
    else{
        alert("Niste popunili sva potrebna polja (naziv, vreme, postupak, sastojci)");
    }
}

function refreshDesniDiv(oznaka){

    let linije = document.querySelectorAll(".linijaIzabraniSastojak");
    for(let lin of linije)
    {
        lin.remove();
    }
    izabraniSastojci=[];

    if(oznaka == "obrisiRecept")
    {
        let izmeniReceptDugme= document.querySelector(".izmeniReceptDugme");
        let postupak= document.querySelector(".inputPostupak");
        let naziv = document.querySelector(".inputNazivRecepta");
        let vreme = document.querySelector(".inputVremeRecepta");
        let kalorije = document.querySelector(".inputKalorijeRecepta");
        let tezina= document.querySelector(".inputTezinaRecepta");

        postupak.value="";
        naziv.value="";
        vreme.value="";
        kalorije.value="";
        tezina.value="";

        postupak.readOnly=true;
        naziv.readOnly=true;
        vreme.readOnly=true;
        tezina.readOnly=true;

        izmeniReceptDugme.style.display="none";     


        crtajListuSastojka();
    }
    if(oznaka="izaberiKnjigu")
    {
        let izmeniReceptDugme= document.querySelector(".izmeniReceptDugme");
        let postupak= document.querySelector(".inputPostupak");
        let naziv = document.querySelector(".inputNazivRecepta");
        let vreme = document.querySelector(".inputVremeRecepta");
        let kalorije = document.querySelector(".inputKalorijeRecepta");
        let tezina= document.querySelector(".inputTezinaRecepta");
        let pomDivSastojci= document.querySelector(".pomDivSastojka");

        postupak.value="";
        naziv.value="";
        vreme.value="";
        kalorije.value="";
        tezina.value="";

        postupak.readOnly=true;
        naziv.readOnly=true;
        vreme.readOnly=true;
        tezina.readOnly=true;

        izmeniReceptDugme.style.display="none";     
        pomDivSastojci.style.display="none";  
        

        let sviSastojci= document.querySelectorAll(".divSastojciDB");
        for(let i=0; i<sviSastojci.length; i++)
        {
            sviSastojci[i].remove();
        }  



    }

   
}