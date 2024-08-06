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
        if(pokemonOneLevel === "five"){
            pokemonOneLevel = 5;
        } else if (pokemonOneLevel === "fifty"){
            pokemonOneLevel = 50;
        } else if (pokemonOneLevel === "one hundred"){
            pokemonOneLevel = 100;
        }
    return pokemonOneLevel;
    } else if (id == "pokemon-two-level"){
        pokemonTwoLevel = document.getElementById('pokemon-two-level').value;
        if(pokemonTwoLevel === "five"){
            pokemonTwoLevel = 5;
        } else if (pokemonTwoLevel === "fifty"){
            pokemonTwoLevel = 50;
        } else if (pokemonTwoLevel === "one hundred"){
            pokemonTwoLevel = 100;
        }
    return pokemonTwoLevel;
    } 
};
//checks for ability
let pokemonOneAbility = "not-applicable"
let pokemonTwoAbility = "not-applicable"
function getAbility(id){
    
}

//reads and returns input for Individual Values (IVs)
let pokemonOneIVs = 0;
let pokemonTwoIVs = 0;
function IvFetcher(id){ 
    if(id == "pokemon-one-IVs") {
        pokemonOneIVs = parseInt(document.getElementById('pokemon-one-IVs').value);
        if(pokemonOneIVs > 31){
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
let pokemonOneEVs = 0;
let pokemonTwoEVs = 0;
function EvFetcher(id){
    if(id == "pokemon-one-EVs"){
        pokemonOneEVs = parseInt(document.getElementById('pokemon-one-EVs').value);
        if(pokemonOneEVs > 252 ){
            pokemonOneEVs = 252;
            document.getElementById('pokemon-one-EVs').value = 252
            console.log('EvInput is greater than 31')
            return pokemonOneEVs;
            } else if (pokemonOneEVs < 0){
                pokemonOneEVs = 0;
                document.getElementById('pokemon-one-EVs').value = 0
                console.log('EvInput is less than 0')
                } else if (!pokemonOneEVs){
                    pokemonOneEVs = 0;
                }
    if(pokemonOne){
        console.log("HELLO")
        pokemonOneSpeedCalc(pokemonOneBaseSpeed);
    }
    return pokemonOneEVs;
    } else if(id == "pokemon-two-EVs"){
        pokemonTwoEVs = parseInt(document.getElementById('pokemon-two-EVs').value);
        if(pokemonTwoEVs > 252 ){
            pokemonTwoEVs = 252;
        document.getElementById('pokemon-two-EVs').value = 252
        console.log('EvInput is greater than 31')
        return pokemonTwoEVs;
    } else if (pokemonTwoEVs < 0){
        pokemonTwoEVs = 0;
        document.getElementById('pokemon-two-EVs').value = 0
        console.log('EvInput is less than 0')
    } 
    return pokemonTwoEVs;
    }
   
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


let pokemonOneBaseSpeed;
async function pokemonOneSpeedFetcher(pokemonOne){
    const pokemonStat = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonOne.toLowerCase())
    const speed = await pokemonStat.json();
    pokemonOneBaseSpeed = speed.stats[5].base_stat;
    pokemonOneSpeedCalc(pokemonOneBaseSpeed);
    console.log(pokemonOneBaseSpeed + " Base Speed");
    return pokemonOneBaseSpeed;
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
        pokemonOneButton.innerHTML = pokemon[0].toUpperCase() + pokemon.slice(1);
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
const inputSecond = document.querySelector("#pokemon-two-input");
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
    const pokemonStat = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonOne.toLowerCase())
    const speed = await pokemonStat.json();
    let pokemonTwoBaseSpeed = speed.stats[5].base_stat;
    pokemonTwoSpeedCalc(pokemonTwoBaseSpeed);
    console.log(pokemonTwoBaseSpeed + " Two Base Speed" );
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
            pokemonTwoButton.innerHTML = pokemon[0].toUpperCase() + pokemon.slice(1);
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
let pokemonOneSpeed;
function pokemonOneSpeedCalc(pokemonOneBaseSpeed){
    if(pokemonOneNature === "Jolly" || pokemonOneNature === "Naive" || pokemonOneNature === "Timid" || pokemonOneNature === "Hasty"){
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (pokemonOneEVs/4)) * pokemonOneLevel/100 + 5) * 1.10);
        console.log(pokemonOneSpeed + " Final Speed");  
    } else if(pokemonOneNature === "Brave" || pokemonOneNature === "Quiet" || pokemonOneNature === "Relaxed" || pokemonOneNature === "Sassy"){
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (pokemonOneEVs/4)) * pokemonOneLevel/100 + 5) - (((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (pokemonOneEVs/4)) * pokemonOneLevel/100 + 5)*0.1));
        console.log(pokemonOneSpeed + " Final Speed");  
    } else{
        pokemonOneSpeed = Math.trunc(((pokemonOneBaseSpeed * 2 + pokemonOneIVs + (pokemonOneEVs/4)) * pokemonOneLevel/100 + 5));
        console.log(pokemonOneSpeed + " Final Speed");  
        updateCalc(pokemonOneSpeed);
    }
    
};

let pokemonTwoSpeed;
function pokemonTwoSpeedCalc(pokemonTwoBaseSpeed){
    if(pokemonTwoNature === "Jolly" || pokemonTwoNature === "Naive" || pokemonTwoNature === "Timid" || pokemonTwoNature === "Hasty"){
        pokemonTwoSpeed = Math.trunc(((pokemonTwoBaseSpeed * 2 + pokemonTwoIVs + (pokemonTwoEVs/4)) * pokemonTwoLevel/100 + 5) * 1.10);
        console.log(pokemonTwoSpeed + " Pokemon Two Final Speed"); 
    } else if(pokemonTwoNature === "Brave" || pokemonTwoNature === "Quiet" || pokemonTwoNature === "Relaxed" || pokemonTwoNature === "Sassy"){
        pokemonTwoSpeed = Math.trunc(((pokemonTwoBaseSpeed * 2 + pokemonTwoIVs + (pokemonTwoEVs/4)) * pokemonTwoLevel/100 + 5) - (((pokemonTwoBaseSpeed * 2 + pokemonTwoIVs + (pokemonTwoEVs/4)) * pokemonTwoLevel/100 + 5)*0.1));
        console.log(pokemonTwoSpeed + " Pokemon Two Final Speed"); 
    } else{
        pokemonTwoSpeed = Math.trunc(((pokemonTwoBaseSpeed * 2 + pokemonTwoIVs + (pokemonTwoEVs/4)) * pokemonTwoLevel/100 + 5));
        console.log(pokemonTwoSpeed + " Pokemon Two Final Speed");  
    }
};

function updateCalc(pokemonOneSpeed){
    const updateText = document.getElementById("insert-test");
    updateText.innerHTML = pokemonOneSpeed;
}