import {Knjiga} from "./knjiga.js";
import {Recept} from "./recept.js";
import {Sastojak} from "./sastojak.js";

export class Api{
    constructor(){

    }
    async GetAllKnjige()
    {        
        try{
            let response = await fetch(`https://localhost:5001/CookBook/GetAllKnjige`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let knjige=[];
                    data.forEach(el => {
                        let knjiga= new Knjiga(el.id,el.naziv,el.kratakOpis,el.recepti);
                        knjige.push(knjiga);                    
                    });
                    return knjige;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }
    async GetKnjigu(id)
    {
        // debugger
        try{
            let response = await fetch(`https://localhost:5001/CookBook/GetKnjiga/${id}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let knjiga=new Knjiga(data.id, data.naziv, data.kratakOpis, data.recepti);
                    // data.forEach(el => {
                    //     let knjiga= new Knjiga(el.id,el.naziv,el.kratakOpis,el.recepti);
                    //     knjige.push(knjiga);                    
                    // });
                    return knjiga;
                }
                case 204:{
                    return true;
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }
    async GetAllRecepteKnjige(idKnjige)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/GetAllRecepte/${idKnjige}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let recepti=[];
                    data.forEach(el => {
                       
                        let recept= new Recept(el.id,el.naziv,el.postupak,el.tezina, el.vreme,el.knjigaID,el.sastojciRecepta,el.kalorije);
                        recepti.push(recept);                    
                    });
                    return recepti;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }
    async AddNovuKnjigu(knjiga)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/AddKnjiga/`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body: JSON.stringify(knjiga)
            });
            switch(response.status){
                case 204: {
                    return true;
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error) {
            console.error(error);
            return null;
        }

    }
    async UpdateKnjigu(knjiga)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/UpdateKnjiga/`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"PUT",
                body: JSON.stringify(knjiga)
            });
            switch(response.status)
            {
                case 204: {
                    return true;
                }
                case 400: {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default: {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.error(error);
            return null;
        }

    }
    async DeleteRecepte(id)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/DeleteRecept/`,{
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method:"DELETE",
                body:JSON.stringify(id)            
            });
            switch(response.status){
                case 204 : {
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${response.text()}`);
                }
                default : {
                    alert(`Server error: ${response.text()}`);
                }
            }
        }
        catch(error){
            console.log(error);
            return null;
        }
    }
    async AddSastojak(sastojak)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/AddSastojak/`,{
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body:JSON.stringify(sastojak)          
            });
            switch(response.status)
            {
                case 204 : {
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${response.text()}`);
                }
                default : {
                    alert(`Server error: ${response.text()}`);
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    async GetAllSastojke()
    {
        // debugger
        try{
            let response = await fetch(`https://localhost:5001/CookBook/GetAllSastojke/`);
            switch(response.status)
            {
                case 200:{
                    let data= await response.json();
                    let sastojci=[];
                    data.forEach(el => {
                        let sastojak= new Sastojak(el.id,el.naziv,el.kalorije,el.mernaJedinica);
                        sastojci.push(sastojak);                    
                    });
                    return sastojci;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }

        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    async AddRecept(recept)
    {
        debugger
        try{
            let response = await fetch(`https://localhost:5001/CookBook/AddRecept/`,{
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body:JSON.stringify(recept)          
            });
            switch(response.status)
            {
                case 204 : {
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${response.text()}`);
                }
                default : {
                    alert(`Server error: ${response.text()}`);
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
        
    }
    async GetRecept(id)
    {
        try{           
            let response = await fetch(`https://localhost:5001/CookBook/GetRecept/${id}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let recept=new Recept(data.id, data.naziv,data.postupak,data.tezina,data.vreme,data.knjigaID,data.sastojciRecepta, data.kalorije)
                            // data.forEach(el => {
                            //     let knjiga= new Knjiga(el.id,el.naziv,el.kratakOpis,el.recepti);
                            //     knjige.push(knjiga);                    
                            // });
                    return recept;
                }
                case 204:{
                    return true;
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
        
    }
    async GetSastojak(id)
    {
        try{           
            let response = await fetch(`https://localhost:5001/CookBook/GetSastojak/${id}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let sastojak=new Sastojak(data.id,data.naziv,data.kalorije,data.mernaJedinica);
                            // data.forEach(el => {
                            //     let knjiga= new Knjiga(el.id,el.naziv,el.kratakOpis,el.recepti);
                            //     knjige.push(knjiga);                    
                            // });
                    return sastojak;
                }
                case 204:{
                    return true;
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    async UpdateRecept(recept)
    {
        try{
            let response = await fetch(`https://localhost:5001/CookBook/UpdateRecept`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"PUT",
                body: JSON.stringify(recept)
            });
            switch(response.status)
            {
                case 204: {
                    return true;
                }
                case 400: {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default: {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.error(error);
            return null;
        }
    }
}

