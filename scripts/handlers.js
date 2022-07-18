import ingredientFetch from "./ingredientFetch.js";
import { createNewDetail, createDrinkType, createDrinkImage, createIngredientList, createNewGlass, createNewInstruction } from "./displayFunctions.js";

export default async function displayResults(results, searchArguments){

    //REMOVE ANY CHILDREN FROM THE RESULTS DIV
    let resultsDiv = document.getElementsByClassName('results')[0];
    while(resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    let resultArr = await results;
    console.log(resultArr);
    

    //CHECK IF RETURNED JSON IS EMPTY
    if(!resultArr.drinks){
        let errorMessage = document.createElement('p');
        errorMessage.className = "error-message";
        errorMessage.innerHTML += `You searched for <b>"${searchArguments[0]}"</b> in <b>"${searchArguments[1]}"</b>.<br> Sorry, we could not find any cockails.<br> Please try again`;
        resultsDiv.appendChild(errorMessage);} 

    //CHECK IF RETURNED RESULTS ARE FOR INGREDIENTS AND DISPLAY RESULTS
    try{
        if(Object.keys(resultArr.drinks[0]).length == 3){

            //DISPLAY HTML FOR INGREDIENT SEARCH;
            resultArr.drinks.forEach((drink) => {

        //FOR EACH DRINK, FETCH INFO FROM DRINKS DB BY DRINK ID 
            let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
            ingredientFetch(idUrl, drink.idDrink)
            .then(response => resultsDiv.appendChild(response))
            .catch(err => console.log(err));
            });

        } else {

        //DISPLAY HTML FOR COCKTAIL SEARCH
                resultArr.drinks.forEach((drink) => {

                    //CREATE NEW DETAIL TO STORE INDIVIDUAL RESULTS
                    let newDetail = createNewDetail(drink)

                    //DIV WRAPPERS FOR FLEX BOX
                    let resultsWrapperDiv = document.createElement('div');
                    resultsWrapperDiv.className = "results-wrapper";

                    let subWrapperDiv1 = document.createElement('div');
                    subWrapperDiv1.className = "sub-wrapper1";

                    let subWrapperDiv2 = document.createElement('div');
                    subWrapperDiv2.className = "sub-wrapper2";

                    //CREATE NEW DRINK TYPE PARAGRAPH
                    if(drink.strIBA){
                        let newDrinkType = createDrinkType(drink);
                        subWrapperDiv1.appendChild(newDrinkType);
                    }

                    //ADD COCKTAIL IMAGE
                    if(drink.strDrinkThumb){
                        let imageDiv = createDrinkImage(drink)
                        subWrapperDiv1.appendChild(imageDiv);
                    }

                    //CREATE INGREDIENT LIST
                    let ingredientList = createIngredientList(drink);
                    subWrapperDiv2.appendChild(ingredientList[0]);
                    subWrapperDiv2.appendChild(ingredientList[1]);

                    //APPEND TWO SUB WRAPPER DIVS TO NEW DETAIL
                    resultsWrapperDiv.appendChild(subWrapperDiv1);
                    resultsWrapperDiv.appendChild(subWrapperDiv2);
                    newDetail.appendChild(resultsWrapperDiv);

                    //CREATE NEW GLASS ENTRY
                    let newGlass = createNewGlass(drink);
                    newDetail.appendChild(newGlass);

                    //CREATE NEW DRINK INSTRUCTIONS PARA
                    let newInstruction = createNewInstruction(drink);
                    newDetail.appendChild(newInstruction);

                    //ADD COMPLETED NEW DETAIL TO RESULTS DIV
                    resultsDiv.appendChild(newDetail);

                });
            };
    } catch (err){
        console.log(`No drinks found returned. Please search again: ${err}`)
    }


//ADD EVENT LISTENER TO ALL DETAILS SO OPENING ANY ONE CLOSES ALL OTHERS
let allDetails = document.querySelectorAll('details');
allDetails.forEach((targetDetail)=>{
    targetDetail.addEventListener('click', ()=>{
        allDetails.forEach((detail)=>{
            if(detail !== targetDetail){
                detail.removeAttribute('open');
            }
        });
      });
    });
};


