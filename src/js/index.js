// =====================================================
// Global Controller
// =====================================================

import { dom, displayLoader, clearLoader } from "./views/baseView";
import * as recipeView from "./views/recipeView";
import * as searchView from "./views/searchView";
import Recipe from "./models/Recipe";
import Search from "./models/Search";

const state = {};

// ----------------- Search controller -----------------

// Search recipes in API and display the results
const search = async () => {
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

// Update search results with pagination
const paginate = (e) => {
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
dom.resultsPages.addEventListener("click", paginate);

// ----------------- Recipe controller -----------------

// Get recipe data
const getRecipe = async () => {
  recipeView.clearRecipe();
  // Retrieving id from hash
  const id = window.location.hash.substring(1);
  // Highlight selected recipe in the list
  recipeView.activateRecipe(id);

  displayLoader(dom.recipe);

  try {
    state.recipe = new Recipe(id);
    await state.recipe.fetchRecipe();
    // Display recipe
    state.recipe.calculateTime();
    state.recipe.setServings();
    recipeView.displayRecipe(state.recipe);
    // Clear loader
    clearLoader();
  } catch (error) {
    alert(error);
  }
};

// Recipe DOM events
window.addEventListener("hashchange", getRecipe);
