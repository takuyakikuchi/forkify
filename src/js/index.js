// ----------------- Global controller -----------------
import Search from "./models/Search";
import { dom, displayLoader, clearLoader } from "./views/baseView";
import * as searchView from "./views/searchView";

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
      displayLoader();
      // Create search instance with API search results
      const search = new Search(input);
      state.search = await search.fetchResult();
      // Display results
      searchView.displayResults(state.search);
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

dom.search.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

dom.resultsPages.addEventListener("click", pagenate);
