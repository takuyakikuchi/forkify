// =====================================================
// Global Controller
// =====================================================

import { dom, displayLoader, clearLoader } from "./views/baseView";

// View
import * as favoritesView from "./views/favoritesView";
import * as recipeView from "./views/recipeView";
import * as searchView from "./views/searchView";
import * as shoppingListView from "./views/shoppingListView";

// Model
import Favorites from "./models/Favorites";
import Recipe from "./models/Recipe";
import Search from "./models/Search";
import ShoppingList from "./models/ShoppingList";

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

    // Hide favorite button when it is already in favorite
    if (checkFavorite(id)) {
      recipeView.hideFavoriteButton();
    }

    // Clear loader
    clearLoader();
  } catch (error) {
    alert(error);
  }
};

// ----------------- Favorites controller -----------------

// @id: Selected Recipe's id
function checkFavorite(id) {
  let alreadyFavorite = false;
  state.favorites.list.forEach((recipe) => {
    if (recipe.id === id) return (alreadyFavorite = true);
  });
  return alreadyFavorite;
}

const loadFavorites = () => {
  state.favorites = new Favorites();

  // Load from local storage
  state.favorites.loadFromStorage();

  // Render favorites
  favoritesView.displayFavorites(state.favorites.list);
};

const addFavorite = (e) => {
  state.favorites.addToList({ ...state.recipe });

  favoritesView.displayFavorites(state.favorites.list);

  getRecipe();
};

// Remove recipe from Favorites on click of delete button on Favorite list
// (Optional) Clear all favorite recipe on click of garbage icon
// Message when favorite added

// ----------------- Shopping List controller -----------------

const addShoppingList = () => {
  state.shoppingList = new ShoppingList();

  // Get ingredients of selected Recipe
  const ingredients = state.recipe.ingredients;

  state.shoppingList.addToList(ingredients);

  shoppingListView.displayShoppingList(state.shoppingList.list);
};

// -------------------------- DOM events ------------------------

// Search
dom.search.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
  recipeView.clearRecipe();
});

// Pagination
dom.resultsPages.addEventListener("click", paginate);

// API call
window.addEventListener("hashchange", getRecipe);

// Loading favorites from Local storage
window.addEventListener("load", loadFavorites);

// Click event for add favorite and add to shopping list
dom.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__love, .recipe__love *")) {
    addFavorite();
  } else if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    addShoppingList();
  }
});
