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
    const recipe = new Recipe(id);
    state.recipe = await recipe.fetchRecipe();
    // display recipe
    recipeView.displayRecipe(state.recipe);
    // Clear loader
    clearLoader();
  } catch (error) {
    alert(error);
  }
};

// Onclick of search lists
window.addEventListener("hashchange", getRecipe);
