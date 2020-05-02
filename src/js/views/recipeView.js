// =========================================
// Recipe View
// =========================================

import { dom } from "./baseView";

// -------------- Private functions --------------

// Making ingredients HTML element which will be merged below to Main part
const renderIngredients = (ingredients) => {
  return ingredients
    .map((ingredient) => {
      return `<li class="recipe__item">
        <svg class="recipe__icon">
          <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__ingredient">
          ${ingredient}
        </div>
      </li>`;
    })
    .join("");
};

// Main part
const renderRecipe = (recipe) => {
  let recipeHTML = `
    <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>
      </div>
      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
      </button>
    </div>
    <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">`;

  // Ingredients part
  recipeHTML += renderIngredients(recipe.ingredients);

  // Publisher part
  recipeHTML += `
    </ul>
    <button class="btn-small recipe__btn">
      <svg class="search__icon">
        <use href="img/icons.svg#icon-shopping-cart"></use>
      </svg>
      <span>Add to shopping list</span>
    </button>
  </div>
  <div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
      <span>Directions</span>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>
    </a>
  </div>`;
  dom.recipe.insertAdjacentHTML("afterbegin", recipeHTML);
};

// -------------- Export functions --------------

export const clearRecipe = () => (dom.recipe.innerHTML = "");

export const displayRecipe = (recipe) => {
  if (!recipe) return;
  renderRecipe(recipe);
};

// Highlight selected recipe in the search result list
export const activateRecipe = (id) => {
  // Check all <li> with the given id, and give/remove active class
  dom.resultsList.childNodes.forEach((li) => {
    if (parseInt(li.dataset.id, 10) === id) {
      li.classList.add("results__link--active");
    } else {
      li.classList.remove("results__link--active");
    }
  });
};
