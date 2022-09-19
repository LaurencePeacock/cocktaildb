import ingredientFetch from "./ingredientFetch.js";
import { createNewDetail, createDrinkType, createDrinkImage, createIngredientList, createNewGlass, createNewInstruction } from "./displayResultsHelperFunctions.js";

const resultsDiv = document.getElementsByClassName('results')[0];
    



export default async function displayResults(results){

    const cocktailResultsArray = await results;

    //CHECK IF RETURNED RESULTS ARE FOR INGREDIENTS AND DISPLAY RESULTS
    try{
        if(Object.keys(cocktailResultsArray.drinks[0]).length == 3){

            //DISPLAY HTML FOR INGREDIENT SEARCH;
            cocktailResultsArray.drinks.forEach((drink) => {

        //FOR EACH DRINK, FETCH INFO FROM DRINKS DB BY DRINK ID 
            let idUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
            ingredientFetch(idUrl, drink.idDrink)
            .then(response => resultsDiv.appendChild(response))
            .catch(err => console.log(err));
            });

        } else {

        //DISPLAY HTML FOR COCKTAIL SEARCH
                cocktailResultsArray.drinks.forEach((drink) => {

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


