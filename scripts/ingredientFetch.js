import { createNewDetail, createDrinkType, createDrinkImage, createIngredientList, createNewGlass, createNewInstruction } from "./displayFunctions.js";
export default async function ingredientFetch (idUrl, drinkID) {

    let request = await fetch(idUrl+drinkID);
    let response = await request.json();
    let drink = response.drinks[0];

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

    return newDetail;
   }
  