///https://pokeapi.co/api/v2/pokemon <---api link 

//checks for nature modifier
let pokemonOneNature = "serious";
let pokemonTwoNature = "serious";
function getNature(id){
    console.log(id)
    if(id == "pokemon-one-nature"){
        pokemonOneNature = document.getElementById('pokemon-one-nature').value;
        return pokemonOneNature;
    } else if(id == "pokemon-two-nature"){
        pokemonTwoNature = document.getElementById('pokemon-two-nature').value;
        return pokemonTwoNature;
    }
   
};
//lets user input what level their format is using
let pokemonOneLevel = 50;
let pokemonTwoLevel = 50;
function getLevel(id){
    if(id == "pokemon-one-level"){
        pokemonOneLevel = document.getElementById('pokemon-one-level').value;
        if(pokemonOneLevel === "one"){
            pokemonOneLevel = 1;
        } else if (pokemonOneLevel === "fifty"){
            pokemonOneLevel = 50;
        } else if (pokemonOneLevel === "one hundred"){
            pokemonOneLevel = 100;
        }
    return pokemonOneLevel;
    } else if (id == "pokemon-two-level"){
        pokemonTwoLevel = document.getElementById('pokemon-two-level').value;
        if(pokemonTwoLevel === "one"){
            pokemonTwoLevel = 1;
        } else if (pokemonTwoLevel === "fifty"){
            pokemonTwoLevel = 50;
        } else if (pokemonTwoLevel === "one hundred"){
            pokemonTwoLevel = 100;
        }
    return pokemonTwoLevel;
    } 
};
//reads and returns input for Individual Values (IVs)
let pokemonOneIVs = 0;
let pokemonTwoIVs = 0;
function IvFetcher(id){ 
    if(id == "pokemon-one-IVs") {
        pokemonOneIVs = parseInt(document.getElementById('pokemon-one-IVs').value);
        if(pokemonOneIVs > 31 ){
            pokemonOneIVs = 31;
            document.getElementById('pokemon-one-IVs').value = 31
            console.log('IvInput is greater than 31')
            return pokemonOneIVs;
    } else if (pokemonOneIVs < 0){
        pokemonOneIVs = 0;
        document.getElementById('pokemon-one-IVs').value = 0
        console.log('IvInput is less than 0')
    } 
        return pokemonOneIVs;
    } else if (id == "pokemon-two-IVs"){
        pokemonTwoIVs = parseInt(document.getElementById('pokemon-two-IVs').value);
        if(pokemonTwoIVs > 31 ){
            pokemonTwoIVs = 31;
            document.getElementById('pokemon-two-IVs').value = 31
            console.log('IvInput is greater than 31')
            return pokemonTwoIVs;
    } else if (pokemonTwoIVs < 0){
        pokemonTwoIVs = 0;
        document.getElementById('pokemon-two-IVs').value = 0
        console.log('IvInput is less than 0')
    } 
        return pokemonTwoIVs;
    }
   
};
//reads and returns input for Effort Values (EVs) 
let EvInput;
function EvFetcher(){  
    EvInput = parseInt(document.getElementById('Ev').value);
        if(EvInput > 252 ){
        EvInput = 252;
        document.getElementById('Ev').value = 252
        console.log('EvInput is greater than 31')
        return EvInput;
    } else if (EvInput < 0){
        EvInput = 0;
        document.getElementById('Ev').value = 0
        console.log('EvInput is less than 0')
    } 
return EvInput;
};

//Pokemon One Autocomplete 
const inputFirst = document.querySelector("#pokemon-one-input");
inputFirst.addEventListener("input", pokemonOneInputChange);
getPokemonData();
let pokemonNames = [];
async function getPokemonData(){
    const pokemonRes = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
    const data = await pokemonRes.json();
        pokemonNames = data.results.map((pokemon) => {
            return pokemon.name;
        });
    console.log(data);
    console.log(pokemonNames);
};

async function pokemonOneSpeedFetcher(pokemonOne){
    const pokemonStat = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonOne)
    const speed = await pokemonStat.json();
    pokemonOneBaseSpeed = speed.stats[5].base_stat;
    pokemonOneSpeedCalc(pokemonOneBaseSpeed);
    console.log(pokemonOneBaseSpeed);
};

function pokemonOneInputChange() {
    removeAutocompleteDropdown();
    const value = inputFirst.value.toLowerCase();
        if(value.length === 0){
        return;
    }
    const filteredNames = [];
    pokemonNames.forEach((pokemonName) => {
            if(pokemonName.substr(0, value.length).toLowerCase() === value){
            filteredNames.push(pokemonName);
            }
        });
    console.log(filteredNames);
    createAutocompleteDropdown(filteredNames);
};

function createAutocompleteDropdown(list){
    const inputFirst = document.createElement('ul');
    inputFirst.className = "autocomplete-list";
    inputFirst.id  = "autocomplete-list"
    list.forEach((pokemon) => {
        const listItem = document.createElement("li");
        const pokemonOneButton = document.createElement("button");
        pokemonOneButton.innerHTML = pokemon;
        pokemonOneButton.addEventListener("click", onPokemonOneButtonClick);
        listItem.appendChild(pokemonOneButton);
        inputFirst.appendChild(listItem);
    });
    document.querySelector("#pokemon-one-autocomplete-wrapper").appendChild(inputFirst);
};

function removeAutocompleteDropdown(){
const inputFirst = document.querySelector("#autocomplete-list");
    if(inputFirst){
        inputFirst.remove();
    } 
};

//Pokemon two autocomplete 
const inputSecond = document.querySelector("#pokemonTwoInput");
inputSecond.addEventListener("input", pokemonTwoInputChange);
getPokemonDataTwo();
let pokemonTwoNames = [];
async function getPokemonDataTwo(){
    const pokemonRes = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
    const data = await pokemonRes.json();
    pokemonTwoNames = data.results.map((pokemon) => {
        return pokemon.name;
    });
    console.log(data);
    console.log(pokemonTwoNames);
};

async function pokemonTwoSpeedFetcher(pokemonOne){
    const pokemonStat = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonOne)
    const speed = await pokemonStat.json();
    pokemonTwoSpeed = speed.stats[5].base_stat;
    alert(pokemonTwoSpeed);
    return pokemonTwoSpeed;
};

function pokemonTwoInputChange() {
    removeAutocompleteDropdownTwo();
    console.log(inputSecond.value);
    const value = inputSecond.value.toLowerCase();
    if(value.length === 0){
        return;
    }
    const filteredNames = [];

    pokemonTwoNames.forEach((pokemonName) => {
        if(pokemonName.substr(0, value.length).toLowerCase() === value){
        filteredNames.push(pokemonName);
        }
    })
    console.log(filteredNames);
    createAutocompleteDropdownTwo(filteredNames);
};

function createAutocompleteDropdownTwo(list){
    const inputSecond = document.createElement('ul');
    inputSecond.className = "autocomplete-list";
    inputSecond.id  = "autocomplete-list-two"
        list.forEach((pokemon) => {
            const listItem = document.createElement("li");
            const pokemonTwoButton = document.createElement("button");
            pokemonTwoButton.innerHTML = pokemon;
            pokemonTwoButton.addEventListener("click", onPokemonTwoButtonClick);
            listItem.appendChild(pokemonTwoButton);
            inputSecond.appendChild(listItem);
    })
    document.querySelector("#pokemon-two-autocomplete-wrapper").appendChild(inputSecond);
}

function removeAutocompleteDropdownTwo(){
    const inputSecond = document.querySelector("#autocomplete-list-two");
        if(inputSecond){
            inputSecond.remove();
    } 
}
//Get click value from Autocomplete to update input text and store pokemon selection
let pokemonOne;
function onPokemonOneButtonClick(event){
    event.preventDefault();
    const pokemonOneButton = event.target; 
    inputFirst.value = pokemonOneButton.innerHTML;
    pokemonOne = pokemonOneButton.innerHTML;
    removeAutocompleteDropdown();
    pokemonOneSpeedFetcher(pokemonOne);
}

let pokemonTwo;
function onPokemonTwoButtonClick(event){
    event.preventDefault();
    const pokemonTwoButton = event.target; 
    inputSecond.value = pokemonTwoButton.innerHTML;
    pokemonTwo = pokemonTwoButton.innerHTML;
    removeAutocompleteDropdownTwo();
    pokemonTwoSpeedFetcher(pokemonTwo);
}
//speed calc
function pokemonOneSpeedCalc(pokemonOneBaseSpeed){
    if(pokemonOneNature === "Jolly" || pokemonOneNature === "Naive" || pokemonOneNature === "Timid" || pokemonOneNature === "Hasty"){
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (EvInput/4)) * pokemonOneLevel/100 + 5) * 1.10);
        console.log(pokemonOneSpeed);
    } else if(pokemonOneNature === "Brave" || pokemonOneNature === "Quiet" || pokemonOneNature === "Relaxed" || pokemonOneNature === "Sassy"){
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (EvInput/4)) * pokemonOneLevel/100 + 5) - (((pokemonOneBaseSpeed * 2 + IvInput + (EvInput/4)) * level/100 + 5)*0.1));
        console.log(pokemonOneSpeed);
    } else{
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (EvInput/4)) * pokemonOneLevel/100 + 5));
        console.log(pokemonOneSpeed);  
    }

}