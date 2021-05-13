"use strict";

const recipeWrapper = document.querySelector("#recipe-template"),
  recipieSection = document.querySelector("#recipe"),
  foodWrapper = document.querySelector(".food");

async function getRecipe() {
  const fetchRecipe = await fetch("./data.json");
  const recipe = await fetchRecipe.json();
  // console.log(recipe.recipes);

  const recipeList = recipe.recipes;
  // console.log(recipeList);

  recipeList.forEach((food) => {
    // Datastruct
    const {
      uuid: foodID,
      title,
      description,
      images: { full: imgFull, medium: imgMed, small: imgSM },
      servings,
      preptime,
      cooktime,
      ingredients: [
        { uuid: ingredientsID, amount, measurement, name: ingredientName },
      ],
      directions: [{ instructions, optional }],
      postDate,
      editDate,
    } = food;

    // generate and insert data to elements
    // Copy the node
    const newRecipe = document.importNode(recipeWrapper.content, true);
    // Defining elements to be inserted by datas
    const foodUUID = document.querySelector(".food-id");
    const foodTitle = document.querySelector(".food-title");
    const foodDesc = document.querySelector(".description");
    const foodServ = document.querySelector(".servings");
    // const foodCookTime = document.querySelector(".cooktime");
    // const foodCookTime = document.querySelector(".cooktime");
    // const foodCookTime = document.querySelector(".cooktime");
    // const foodCookTime = document.querySelector(".cooktime");
    // const foodCookTime = document.querySelector(".cooktime");
    // const foodUUID = document.querySelector(".food-title");
    // console.log(foodID);

    recipieSection.appendChild(newRecipe);
    // foodUUID.textContent = `${foodID}`;
    // foodTitle.textContent = `${title}`;
    // foodDesc.textContent = description;
    // foodServ.textContent = servings;
    foodUUID.textContent = `123123123123`;
    foodTitle.textContent = `xd title`;
    foodDesc.textContent = `lorem10`;
    foodServ.textContent = `4`;
    // recipieSection.appendChild(newRecipe);
  });
}
getRecipe();
