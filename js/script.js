"use strict";

const recipeWrapper = document.getElementById("recipe"),
  foodWrapper = document.querySelector(".food");

async function getRecipe() {
  const fetchRecipe = await fetch("./data.json");
  const recipe = await fetchRecipe.json();
  console.log(recipe.recipes);
}
getRecipe();
// DOMQuad.///
