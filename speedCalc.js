///https://pokeapi.co/api/v2/pokemon <---api link 

/* logic for speed calculation

if(nature == "Jolly" ){
        pokemonOneSpeed = Math.trunc(((baseSpeed * 2 + IvInput + (EvInput/4)) * level/100 + 5) * 1.10);
        console.log(pokemonOneSpeed);
    } else {
        pokemonOneSpeed = Math.trunc(((baseSpeed * 2 + IvInput + (EvInput/4)) * level/100 + 5));
        console.log(pokemonOneSpeed);
    }

*/ 

//checks for nature modifier and calculates increased speed stat by 10%
let nature;
function getNature(){
    nature = document.getElementById('pokemon-nature').value;
    return nature;
}
//reads and returns input for Individual Values (IVs)
let IvInput;
function IvFetcher(){  
    IvInput = parseInt(document.getElementById('Iv').value);
if(IvInput > 31 ){
    IvInput = 31;
    document.getElementById('Iv').value = 31
    console.log('IvInput is greater than 31')
    return IvInput;
} else if (IvInput < 0){
    IvInput = 0;
    document.getElementById('Iv').value = 0
    console.log('IvInput is less than 0')
} 
return IvInput;
}
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
}
//lets user input what level their format is using
let level = 50;
function getLevel(){
    level = document.getElementById('pokemon-level').value;
    if(level === "one"){
        level = 1;
    } else if (level === "fifty"){
        level = 50;
    } else if (level === "one hundred"){
        level = 100;
    }
    return level;
}

//Pokemon One Autocomplete 
const inputFirst = document.querySelector("#pokemonOneInput");
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
}

function pokemonOneInputChange() {
    removeAutocompleteDropdown();

console.log(inputFirst.value);
const value = inputFirst.value.toLowerCase();
if(value.length === 0){
    return;
}
const filteredNames = [];

pokemonNames.forEach((pokemonName) => {
    if(pokemonName.substr(0, value.length).toLowerCase() === value){
        filteredNames.push(pokemonName);
    }
})
console.log(filteredNames);
createAutocompleteDropdown(filteredNames);
}

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
})

document.querySelector("#autocomplete-wrapper").appendChild(inputFirst);
}

function removeAutocompleteDropdown(){
const inputFirst = document.querySelector("#autocomplete-list");
if(inputFirst){
    inputFirst.remove();
} 
}



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
}

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
}

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

document.querySelector("#autocomplete-wrapper-two").appendChild(inputSecond);
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
return pokemonOne;
}

let pokemonTwo;
function onPokemonTwoButtonClick(event){
event.preventDefault();
const pokemonTwoButton = event.target; 
inputSecond.value = pokemonTwoButton.innerHTML;
pokemonTwo = pokemonTwoButton.innerHTML;
removeAutocompleteDropdownTwo();
return pokemonTwo;
}

