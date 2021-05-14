"use strict";

const recipeWrapper = document.querySelector("#recipe-template"),
  recipieSection = document.querySelector("#recipe"),
  foodWrapper = document.querySelector(".food"),
  specialWrapper = document.querySelector("#specials-template"),
  specialSection = document.querySelector("#specials");

async function getRecipe() {
  const fetchRecipe = await fetch("./data.json");
  const recipe = await fetchRecipe.json();
  console.log(recipe);

  const { recipes: recipeList, specials: specialsList } = recipe;

  const storeIngID = [{}];
  const getIngredientID = function (ingID, ingName) {
    const ingObj = {};
    ingObj.ingredientID = ingID;
    ingObj.ingredientName = ingName;
    storeIngID.push(ingObj);
  };

  recipeList.forEach((recipeFood) => {
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
    } = recipeFood;

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

    ingredients.forEach((ingredientArr) => {
      const {
        uuid: ingredientsID,
        amount,
        measurement,
        name: ingredientName,
      } = ingredientArr;
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
      // console.log(ingredientsID);
      getIngredientID(ingredientsID, ingredientName);
    });
    directions.forEach((directArr) => {
      const { instructions, optional } = directArr;
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
  console.log(storeIngID);
  // console.log(recipeList);
  // specialsList.forEach((specialFoods) => {
  //   const {
  //     uuid,
  //     ingredientID: specialIngID,
  //     type,
  //     title,
  //     geo,
  //     text,
  //   } = specialFoods;
  //   const newSpecial = document.importNode(specialWrapper.content, true);

  //   const ingName = newSpecial.querySelector(".special-ingredient-name");
  //   const specialTitle = newSpecial.querySelector(".special-title");
  //   const specialType = newSpecial.querySelector(".special-type");
  //   const specialP = newSpecial.querySelector(".special-p");
  //   const specialGeo = newSpecial.querySelector(".special-geo");

  //   // specialTitle.textContent = title;
  //   // specialType.textContent = type;
  //   // specialP.textContent = text;
  //   // specialGeo.textContent = geo;
  //   // specialSection.appendChild(newSpecial);

  //   storeIngID.forEach((ingArr) => {
  //     const { ingredientID: recIngID, ingredientName } = ingArr;

  //     if (recIngID == specialIngID) {
  //       ingName.textContent = ingredientName;
  //     }
  //     console.log(ingredientName);
  //   });
  //   specialTitle.textContent = title;
  //   specialType.textContent = type;
  //   specialP.textContent = text;
  //   specialGeo.textContent = geo;
  //   specialSection.appendChild(newSpecial);
  // });

  storeIngID.forEach((ingArr) => {
    const { ingredientID: recIngID, ingredientName } = ingArr;

    specialsList.forEach((specialFoods) => {
      const { uuid, ingredientId, type, title, geo, text } = specialFoods;
      const newSpecial = document.importNode(specialWrapper.content, true);
      const ingName = newSpecial.querySelector(".special-ingredient-name");
      const specialTitle = newSpecial.querySelector(".special-title");
      const specialType = newSpecial.querySelector(".special-type");
      const specialP = newSpecial.querySelector(".special-p");
      const specialGeo = newSpecial.querySelector(".special-geo");

      if (ingredientId == recIngID) {
        ingName.textContent = ingredientName;
        specialTitle.textContent = title;
        specialType.textContent = type;
        specialP.textContent = text;
        specialGeo.textContent = geo;
        specialSection.appendChild(newSpecial);
        // console.log(ingredientId);
      }
    });
  });
}
getRecipe();
