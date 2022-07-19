let input = document.getElementById('search');
let searchContainer = document.getElementsByClassName('search-container')[0];
let searchIcon = document.getElementsByClassName('looking-glass')[0];

let cocktailsFilter = document.getElementById('cocktails-button');
let ingredientsFilter = document.getElementById('ingredients-button');

let filter = 'cocktail'
let searchFilter = "";


//IMPORT QUOTES
import { quotes } from './quotes.js';

//ADD QUOTE TO PAGE
let quote = document.getElementsByClassName('quote')[0];
let quoter = document.getElementsByClassName('quoter')[0];

let num = Math.floor(Math.random()*11);
let selectedQuote = quotes['quote'+num];
let quoteTextNode = document.createTextNode(selectedQuote.quote);
let quoterTextNode = document.createTextNode(selectedQuote.quoter);
quote.appendChild(quoteTextNode);
quoter.appendChild(quoterTextNode);


//IMPORT FETCH API FUNCTION
import { fetchCocktail } from './fetch.js';
import displayResults from './handlers.js';


//BUTTON ADD REMOVE CLASSES AND SET FILTER
cocktailsFilter.addEventListener('click', ()=>{
    if(!cocktailsFilter.classList.contains('button-active')){
        cocktailsFilter.classList.add('button-active');
        ingredientsFilter.classList.remove('button-active');
        filter = 'cocktail';
    }
});
ingredientsFilter.addEventListener('click', ()=>{
    if(!ingredientsFilter.classList.contains('button-active')){
        ingredientsFilter.classList.toggle('button-active');
        cocktailsFilter.classList.remove('button-active');
        filter = 'ingredient';
    }
});

//search input event listener
input.addEventListener('click', ()=>{
    // searchContainer.style.borderStyle = 'solid';
    // searchContainer.style.borderSize = '2px';
    // searchContainer.style.borderColor = 'blue';
    if(input.value == "Search"){
        input.value = ""
    };
});
searchIcon.addEventListener('click', ()=> {
        getSearchInput();
        input.value = 'Search';
})

let searchInput = [filter];

function getSearchInput(){

    //RECEIVE AND TIDY SEARCH INPUT
    let lowerCaseSearch = input.value.toLowerCase()
    
    //IF MULTIPLE WORDS JOIN WITH UNDERSCORE
    let search = lowerCaseSearch.replaceAll(" ","_");

    //DETERMINE WHICH FILTER TO USE
    switch (filter){
        case 'cocktail':
        filter = "s";
        searchFilter = "search";
        break;
        case 'ingredient':
        filter = "i";
        searchFilter = "filter";
        break;
        case 'glass':
        filter = "g";
        searchFilter = "filter";
        break;
    }

    //COMPILE URL
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/'+searchFilter+'.php?'+filter+"="+search;

    //PROVIDE URL AND SEARCH PARAMS TO FETCH FUNCTION FOR USER 'NO RESULTS' message
    let buttonChoice;
    if(filter == "s"){
        buttonChoice = 'Cocktails';
    } else {
        buttonChoice = "Ingredients"
    };
    let searchArguments = [input.value, buttonChoice];

    displayResults(fetchCocktail(url), searchArguments);
};

//DETECT ENTER KEY IN SEARCH FIELD
window.addEventListener('keydown', (e) => {
    if(e.key === "Enter" && (input.value)){
        getSearchInput();
        input.value = 'Search';
    }
});
//REMOVE FOCUS STYLING FROM SEARCH BAR
window.addEventListener('click', (e) => {
    let target = e.target.getAttribute('id');
    if(target !== 'search'){
        searchContainer.style.borderStyle = 'solid';
        searchContainer.style.borderSize = '1px';
        searchContainer.style.borderColor = 'rgb(237, 237, 237';
        if(!input.value){ 
            input.value === 'Search';
        }
    }    
})



