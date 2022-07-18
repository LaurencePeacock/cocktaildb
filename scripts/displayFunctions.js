 function createNewDetail (drink) {
        let newDetail = document.createElement('details');
        let newSummary = document.createElement('summary');
        newSummary.className = "summary-class";
        let newSummaryTitle = document.createTextNode(drink.strDrink);
        newSummary.appendChild(newSummaryTitle);
        newDetail.appendChild(newSummary);
        return newDetail;
}

 function createDrinkType (drink) {
    let newDrinkType = document.createElement('p');
                    newDrinkType.className += "drink-type";
                    let newDrinkTypeName = document.createTextNode(drink.strIBA);
                    newDrinkType.appendChild(newDrinkTypeName);
                    
                    return newDrinkType;
}

function createDrinkImage (drink) {
    let imageDiv = document.createElement('div');
                        imageDiv.className = 'image-div';
                        let newImage = document.createElement('img');
                        newImage.src = drink.strDrinkThumb;
                        return imageDiv.appendChild(newImage);
};

function createIngredientList (drink) {
                    let ingredientTitle = document.createElement('p');
                    ingredientTitle.className = "ingredient-title";
                    let ingredientTitleText = document.createTextNode('Ingredients');
                    ingredientTitle.appendChild(ingredientTitleText);
                    let newIngredientList = document.createElement('ul');
                    for(let i=1; i<16; i++){
                        if(drink['strIngredient'+i]){
                        let newIngredient = document.createElement('li');
                        let ingredient = document.createTextNode(drink['strIngredient'+i]);
                        newIngredient.appendChild(ingredient);
                        newIngredientList.appendChild(newIngredient);    
                        }
                    }
                    return [ingredientTitle, newIngredientList];
}

function createNewGlass (drink) {
            let newGlass = document.createElement('p');
            newGlass.className = "glass-type";
            let newGlassName = document.createTextNode(drink.strGlass);
            newGlass.innerHTML = `<span><b>Use a: </b></span>`;
            newGlass.appendChild(newGlassName);
            return newGlass;
}

function createNewInstruction (drink) {
    let newInstructionsEntry = document.createElement('p');
                    let newInstructionsContent = document.createTextNode(drink.strInstructions);
                    newInstructionsEntry.innerHTML = `<span><b>Instructions: </b></span>`;
                    newInstructionsEntry.appendChild(newInstructionsContent);
                    return newInstructionsEntry;
}

export {createNewDetail, createDrinkType, createDrinkImage, createIngredientList, createNewGlass, createNewInstruction}