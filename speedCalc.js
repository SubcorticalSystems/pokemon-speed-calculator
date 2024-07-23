///https://pokeapi.co/api/v2/pokemon <---api link 

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
//search for pokemon with arrow function practice

/*
const searchInput = document.getElementById('pokemonSearch');
const searchWrapper = document.querySelector('.wrapper');
const resultsWrapper = document.querySelector('.results');
let pokemonOneSelection;
searchInput.addEventListener('keyup', () => {
  let results = [];
  let input = searchInput.value;
  if (input.length) {
    results = pokemon.filter(
        (item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    }
);
  }
  renderResults(results);
});

function renderResults(results) {
  if (!results.length) {
    return searchWrapper.classList.remove('show');
  } else if (results.length){
    let content = results.map((item) => {return `<li id="pokemonSelectionOne" onclick=updater()>${item}</li>`;}).join('');
    searchWrapper.classList.add('show');
    resultsWrapper.innerHTML = `<ul>${content}</ul>`;
    pokemonOneSelection = document.getElementById('pokemonSelectionOne').innerText;
    console.log(pokemonOneSelection + " Inside render results");
    return pokemonOneSelection;
  }
}

function updater(){
    document.getElementById('pokemonSearch').value = document.getElementById('pokemonSelectionOne').innerText;
    searchWrapper.classList.remove('show');
    pokemonParser();
}
*/
const inputFirst = document.querySelector("#pokemonOneInput");
inputFirst.addEventListener("input", pokemonOneInputChange)

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


let pokemonOne;
function onPokemonOneButtonClick(event){
event.preventDefault();
const pokemonOneButton = event.target; 
inputFirst.value = pokemonOneButton.innerHTML;
pokemonOne = pokemonOneButton.innerHTML;
removeAutocompleteDropdown();
return pokemonOne;
}



//Take selected pokemon and parse the obj 
function pokemonParser(){
    let baseSpeed = pokemon_base_speed[pokemonOneSelection];
    let pokemonOneSpeed;
    if(nature == "Jolly"){
        pokemonOneSpeed = Math.trunc(((baseSpeed * 2 + IvInput + (EvInput/4)) * level/100 + 5) * 1.10);
        console.log(pokemonOneSpeed);
    }
}