//IMPORT FETCH API FUNCTION
import  fetchCocktail  from './fetch.js';
import displayResults from './displayResults.js';
import  getAlcoholQuote  from './getAlcoholQuote.js'
import { getInputValue, makeInputValueLowerCase, joinInputValuesWithUnderscores, constructUrltoFetch, displayErrorMessage, removeAnyExistingChildrenFromResultsDiv } from './queryCocktailApiHelperFunctions.js'

//DOCUMENT ELEMENTS
const input = document.getElementById('search');
const searchContainer = document.getElementsByClassName('search-container')[0];
const searchIcon = document.getElementsByClassName('looking-glass')[0];
const cocktailsFilter = document.getElementById('cocktails-button');
const ingredientsFilter = document.getElementById('ingredients-button');
let urlLetterSearchOrFilter = "s";
let urlWordSearchOrFilter = "search"
let errorMessageCocktailsOrIngredientsVariable = "Cocktails";
const unmute = document.getElementsByClassName('unmute')[0];
const mute = document.getElementsByClassName('mute')[0];
const audio = document.getElementsByTagName('audio')[0];
const rootUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

getAlcoholQuote();

async function  queryCocktailApi() {
        const inputValue = getInputValue();
        const inputValueToLowerCase = makeInputValueLowerCase(inputValue);
        const inputValueAddUnderscores = joinInputValuesWithUnderscores(inputValueToLowerCase);
        const urlToFetch = constructUrltoFetch(rootUrl, urlWordSearchOrFilter, urlLetterSearchOrFilter, inputValueAddUnderscores);
        const results = await fetchCocktail(urlToFetch);
        if(results.drinks === null){
            removeAnyExistingChildrenFromResultsDiv();
            displayErrorMessage(errorMessageCocktailsOrIngredientsVariable, inputValueAddUnderscores)
        } else if(!results){
            removeAnyExistingChildrenFromResultsDiv();
            displayErrorMessage(errorMessageCocktailsOrIngredientsVariable, inputValueAddUnderscores)
        }
        else {
            removeAnyExistingChildrenFromResultsDiv();
            displayResults(results) 
        }
}


//EVENT LISTENERS
cocktailsFilter.addEventListener('click', ()=>{
    urlLetterSearchOrFilter = "s"
    urlWordSearchOrFilter = "search"
    errorMessageCocktailsOrIngredientsVariable = "Cocktails";
    cocktailsFilter.classList.add('button-active');
    ingredientsFilter.classList.remove('button-active')
        if(input.value !== "Search" && input.value.length !== 0){
            queryCocktailApi();
            input.value = 'Search';
        }
    });

ingredientsFilter.addEventListener('click', ()=>{
    errorMessageCocktailsOrIngredientsVariable = "Ingredients";
    urlLetterSearchOrFilter = "i";
    urlWordSearchOrFilter = "filter";
    ingredientsFilter.classList.toggle('button-active');
    cocktailsFilter.classList.remove('button-active')
        if(input.value !== "Search" && input.value.length !== 0){
            queryCocktailApi();
            input.value = 'Search';
        };
    });

//search input event listener
 input.addEventListener('click', ()=>{
        if(input.value == "Search"){
                input.value = ""
            };
        });
searchIcon.addEventListener('click', ()=> {
            queryCocktailApi();
            input.value = 'Search';
        })

//DETECT ENTER KEY IN SEARCH FIELD
window.addEventListener('keydown', (e) => {
                if(e.key === "Enter" && (input.value)){
                    queryCocktailApi();
                    input.value = 'Search';
                }
            });

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

unmute.addEventListener('click', () => {
        audio.play();
        audio.muted = false;
        unmute.style.display = 'none';
        mute.style.display = 'block';
    })
mute.addEventListener('click', () => {
        audio.muted = true;
        unmute.style.display = 'block';
        mute.style.display = 'none';
    })


