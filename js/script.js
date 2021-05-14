"use strict";

const recipeWrapper = document.querySelector("#recipe-template"),
  recipieSection = document.querySelector("#recipe"),
  foodWrapper = document.querySelector(".food");

async function getRecipe() {
  const fetchRecipe = await fetch("./data.json");
  const recipe = await fetchRecipe.json();
  // console.log(recipe.recipes);

  const recipeList = recipe.recipes;

  recipeList.forEach((food) => {
    // Datastruct
    const {
      uuid: foodID,
      title,
      description,
      images: { full: imgFull, medium: imgMed, small: imgSM },
      servings,
      prepTime,
      cookTime,
      ingredients,
      directions,
      postDate,
      editDate,
    } = food;

    // generate and insert data to elements
    // Copy the node
    const newRecipe = document.importNode(recipeWrapper.content, true);
    // Defining elements to be inserted by datas
    const foodUUID = newRecipe.querySelector(".food-id");

    const foodTitle = newRecipe.querySelector(".food-title");
    const foodDesc = newRecipe.querySelector(".description");
    const foodServ = newRecipe.querySelector(".servings");
    const foodPrepTime = newRecipe.querySelector(".preptime");
    const foodCookTime = newRecipe.querySelector(".cooktime");
    const foodimg = newRecipe.querySelector(".food-img");

    const foodPostTime = newRecipe.querySelector(".post");
    const foodEditTime = newRecipe.querySelector(".edit");
    // console.log(foodID);
    foodimg.setAttribute("src", imgMed);
    foodUUID.textContent = foodID;
    foodTitle.textContent = title;
    foodDesc.textContent = description;
    foodServ.textContent = servings;
    foodPrepTime.textContent = prepTime;
    foodCookTime.textContent = cookTime;

    Object.entries(ingredients).forEach((ingredientArr, ingredientKey) => {
      const [
        ingredientNum,
        { uuid: ingredientsID, amount, measurement, name: ingredientName },
      ] = ingredientArr;
      const ingredientListTemplate = newRecipe.querySelector(
        ".ingredient-template"
      );
      const ingredientList = newRecipe.querySelector(".ingredient");
      const newIngredient = document.importNode(
        ingredientListTemplate.content,
        true
      );
      const ingredientTitle = newIngredient.querySelector(".ingredient-title");
      const ingredientID = newIngredient.querySelector(".ingredient-id");
      const ingredientAmount = newIngredient.querySelector(".amount");
      const ingredientMeasure = newIngredient.querySelector(".measurement");
      ingredientTitle.textContent = ingredientName;
      ingredientID.textContent = ingredientsID;
      ingredientAmount.textContent = amount;
      ingredientMeasure.textContent = measurement;
      ingredientList.appendChild(newIngredient);

      // const sampleID = "3d810ba9-7e4e-48aa-b2e9-7918e38b358d";

      // if (sampleID == ingredientsID) {
      //   console.log(ingredientName);
      // }
    });
    Object.entries(directions).forEach((directArr, directKey) => {
      const [num, { instructions, optional }] = directArr;
      const directTemplate = newRecipe.querySelector(".direction-template");
      const directList = newRecipe.querySelector(".direction-list");
      const newDirect = document.importNode(directTemplate.content, true);
      const directInstruct = newDirect.querySelector(".instruction");
      const directOption = newDirect.querySelector(".optional");

      directInstruct.textContent = instructions;
      directOption.textContent = optional ? "Yes" : "No";
      directList.appendChild(newDirect);
    });

    foodPostTime.textContent = postDate;
    foodEditTime.textContent = editDate;
    recipieSection.appendChild(newRecipe);
  });
}
getRecipe();
