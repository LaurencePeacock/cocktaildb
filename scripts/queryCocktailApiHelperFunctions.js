
const input = document.getElementById('search');
const errorContainer = document.getElementsByClassName('error-container')[0];
const resultsDiv = document.getElementsByClassName('results')[0];

function getInputValue () {
    const inputValue = input.value;
    return inputValue;
}
function makeInputValueLowerCase (inputValue) {
    return inputValue.toLowerCase();
}
function joinInputValuesWithUnderscores(inputValueToLowerCase){
    return inputValueToLowerCase.replaceAll(" ","_");
}
function constructUrltoFetch(rootUrl, urlWordSearchOrFilter, urlLetterSearchOrFilter, inputValueAddUnderscores){
    return rootUrl + urlWordSearchOrFilter +'.php?'+urlLetterSearchOrFilter+"="+inputValueAddUnderscores;

}
function displayErrorMessage(errorMessageCocktailsOrIngredientsVariable, inputValueAddUnderscores){
    let errorMessage = document.createElement('p');
    errorMessage.className = "error-message";
    errorMessage.innerHTML += `You searched for <b>"${inputValueAddUnderscores}"</b> in <b>"${errorMessageCocktailsOrIngredientsVariable}"</b>.<br> Sorry, we could not find any cockails.<br> Please try again`;
    errorContainer.appendChild(errorMessage);
}
const removeAnyExistingChildrenFromResultsDiv = () =>{
    
    while(resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
    while(errorContainer.firstChild){
        errorContainer.removeChild(errorContainer.firstChild);
    }
}

export { getInputValue, makeInputValueLowerCase, joinInputValuesWithUnderscores, constructUrltoFetch, displayErrorMessage, removeAnyExistingChildrenFromResultsDiv }