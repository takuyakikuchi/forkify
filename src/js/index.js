// =====================================================
// Global Controller
// =====================================================

import { dom, displayLoader, clearLoader } from "./views/baseView";

// View
import * as favoritesView from "./views/favoritesView";
import * as recipeView from "./views/recipeView";
import * as searchView from "./views/searchView";

// Model
import Favorites from "./models/Favorites";
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

window.addEventListener("hashchange", getRecipe);

// ----------------- Favorites controller -----------------

const loadFavorites = () => {
  state.favorites = new Favorites();

  // Load from local storage
  state.favorites.loadFromStorage();

  // Render favorites
  favoritesView.displayFavorites(state.favorites.list);
};

const addFavorite = (e) => {
  state.favorites.addToList({ ...state.recipe });

  // Disable favorite button
  // e.target.closest(".recipe__love").disabled = true;

  favoritesView.displayFavorites(state.favorites.list);
};

// EventListers
window.addEventListener("load", loadFavorites);
dom.recipe.addEventListener("click", addFavorite);

// Remove recipe from Favorites on click of delete button on Favorite list
// (Optional) Clear all favorite recipe on click of garbage icon
