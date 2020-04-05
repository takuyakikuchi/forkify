// ----------------- Global controller -----------------
import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { dom, displayLoader, clearLoader } from "./views/baseView";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

const state = {};

// ----------------- Search controller -----------------

// Search recipes in API
const search = async () => {
  // Get input value
  const input = searchView.getSearchValue();
  if (input) {
    try {
      // Clear existing lists and page buttons
      searchView.clearResults();
      // Display loader
      displayLoader(dom.results);
      // Create search instance with API search results
      const search = new Search(input);
      state.search = await search.fetchResult();
      // Display results
      searchView.displayResults(state.search);
      // Clear loader
      clearLoader();
    } catch (error) {
      alert(error);
    }
  }
};

// Get target page number from the closest page button
const pagenate = (e) => {
  if (e.target.closest("[data-page]")) {
    // Clear existing lists and page buttons
    searchView.clearResults();
    // Retrieving target page
    const targetPage = parseInt(e.target.closest("[data-page]").dataset.page);
    // Display results
    searchView.displayResults(targetPage);
  }
};

// DOM events
dom.search.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
  recipeView.clearRecipe();
});
dom.resultsPages.addEventListener("click", pagenate);

// ----------------- Recipe controller -----------------

// Get recipe data
const getRecipe = async () => {
  // Clear existing recipe
  recipeView.clearRecipe();
  // Retreving id from hash
  const id = parseInt(window.location.hash.substring(1), 10);
  // Hilight selected recipe in the list
  recipeView.activateRecipe(id);
  // Fetching recipe from API
  try {
    // Display loader
    displayLoader(dom.recipe);
    state.recipe = new Recipe(id);
    await state.recipe.fetchRecipe();
    // display recipe
    state.recipe.calcurateTime();
    state.recipe.setServings();
    recipeView.displayRecipe(state.recipe);
    // Clear loader
    clearLoader();
  } catch (error) {
    alert(error);
  }
};

const updateServings = (e) => {
  // Check if the clicked part is servings -/+
  if (e.target.matches(".recipe__info-buttons *")) {
    // Update servings based on the button clicked
    const className = e.target.closest("button").className;
    console.log(state.recipe);
    // className.includes("decrease")
    //   ? state.recipe.updateServings("decrease")
    //   : state.recipe.updateServings("increase");
    // recipeView.clearRecipe();
    // recipeView.displayRecipe(state.recipe);
  }
};

window.addEventListener("hashchange", getRecipe);

dom.recipe.addEventListener("click", (e) => {
  if (state.recipe.servings > 1) {
    updateServings(e);
  }
});
