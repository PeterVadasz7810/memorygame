/*
Az állatkertek napja alkalmára készített állatos memóriajáték
Készítette: Vadász Péter
Licence: CC-BY-SA
Év: 2020
*/
let playground = new Array(24); //ebben a változóban tároljuk a táblát
let animals = ['01.jpg','02.jpg','03.jpg','05.jpg','06.jpg','07.jpg','08.jpg','11.jpg','12.jpg','13.jpg','15.jpg','16.jpg']; //ezek kerülnek a táblába 
let activeFieldsCounter = -1; //ebben tároljuk, hogy van e megfordított kártya
let dataValue = -1; //a HTML táblázat cellájának data-value értékét tárolja
let kepfordit_fut = 0; //megakadályozzuk, hogy kettőnél több kép legyen egyidőben megfordítva
let tabla = document.querySelector("table");

function kever (aMibol) {
    //elhelyezzük a playground tömbben az animals tömb minden elemét két példányban véletlenszerűen
    let x = -1;
    let k = 0;
    let db = 0;
    
    while ( k < aMibol.length) {
        x = Math.floor(Math.random()* 24);
        if (typeof playground[x] === 'undefined') {
            playground[x] = aMibol[k];
            db += 1;
        }
        if (db == 2) {
            db = 0;
            k += 1;
        }
    }
}

function tablaKeszites(tabla){
    //kirajzoljuk a táblázatot a weblapra, beállítjuk a cellára a kattintás eseményt
    let szamlalo = 0;
    for (let i = 0; i < 4; i++) {
        let sor = tabla.insertRow();
        for (let j = 0; j < 6; j++){
            let cella = sor.insertCell();
            cella.setAttribute('data-value',szamlalo);
            cella.setAttribute('id',szamlalo);
            cella.addEventListener('click',kepFordit);
            let tartalom = document.createTextNode(szamlalo);
            cella.appendChild(tartalom);
            szamlalo +=1;
        }
    }
}

function nyertEllenor() {
    //ellenőrizzük, hogy minden pár meg lett e találva
    let osszeg = 0;

    for (let i=0; i<13; i++){
        if (typeof animals[i] === 'number') {
            osszeg += animals[i];
        }
    }
    if (osszeg == 12) {
        return true;
    } else return false;
}

function osszehasonlit(aField1, aField2){
    //A két megfordított képet hasonlítja össze, hogy azonos e
    let egyezik = false;

    if (aField1 == aField2) {
        egyezik = true;
    }
    return egyezik;
}

function visszafordit(aField1, aField2) {
    //elrejti a képeket
    activeFieldsCounter = -1;
    dataValue = -1;
    kepfordit_fut = 0;
    document.getElementById(aField1).innerHTML = aField1;
    document.getElementById(aField1).addEventListener('click',kepFordit); //visszatesszük a kattintás eseményt cellára
    document.getElementById(aField2).innerHTML = aField2;
    document.getElementById(aField2).addEventListener('click',kepFordit);
}

function kepFordit() {
    let dv = Number(this.getAttribute('data-value'));
    kepfordit_fut += 1;
    if ( kepfordit_fut <=2 ) {
        this.innerHTML = '<img src="./img/'+playground[dv]+'" alt="'+playground[dv]+'" width="80" height="80">';
        document.getElementById(String(dv)).removeEventListener('click',kepFordit); //eltávolítjuk a kattintás eseményt celláról
        if (activeFieldsCounter == -1) {
            activeFieldsCounter = animals.indexOf(playground[dv]);
            dataValue = dv;
        } else {
            if (osszehasonlit(activeFieldsCounter, animals.indexOf(playground[dv])) == true) {
                animals[activeFieldsCounter] = 1;
                activeFieldsCounter = -1;
                dataValue = -1;
                kepfordit_fut = 0;
                if (nyertEllenor() == true) {
                    alert('Gratulálok!');
                }
            } else {
                setTimeout(function() {visszafordit(dataValue,dv);},1500);
            }
        }
    }
}

//indul a buli
kever(animals);
tablaKeszites(tabla);