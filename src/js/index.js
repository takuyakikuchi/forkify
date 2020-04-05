// =====================================================
// Global Controller
// =====================================================

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import { dom, displayLoader, clearLoader } from "./views/baseView";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

const state = {};

// ----------------- Search controller -----------------

// Search recipes in API and display the results
const search = async () => {
  // Get input value
  const input = searchView.getSearchValue();

  if (input) {
    // Clear existing lists and page buttons, display Loader
    searchView.clearResults();
    displayLoader(dom.results);

    try {
      // Create search instance of API search results
      state.search = new Search(input);
      await state.search.fetchResult();

      // Display results, clearLoader
      searchView.displayResults(state.search);
      clearLoader();
    } catch (error) {
      alert(error);
    }
  }
};

// Update search results with pagenation
const pagenate = (e) => {
  if (e.target.closest("[data-page]")) {
    // Clear existing lists and page buttons
    searchView.clearResults();

    // Retrieving target page with "[data-page]" and display results accordingly
    const targetPage = parseInt(e.target.closest("[data-page]").dataset.page);
    searchView.displayResults(state.search, targetPage);
  }
};

// Search DOM events
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

// Update servings and ingredients
const updateServings = (e) => {
  // Check if the clicked button is servings -/+
  if (e.target.matches(".recipe__info-buttons *")) {
    // Update servings based on the button clicked
    const className = e.target.closest("button").className;
    className.includes("decrease")
      ? state.recipe.updateServings("decrease")
      : state.recipe.updateServings("increase");
    recipeView.clearRecipe();
    recipeView.displayRecipe(state.recipe);
  }
};

// Recipe DOM events
window.addEventListener("hashchange", getRecipe);

dom.recipe.addEventListener("click", updateServings);
