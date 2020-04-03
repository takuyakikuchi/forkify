// ----------------- Global controller -----------------
import Search from "./models/Search";
import { dom } from "./views/baseView";
import * as searchView from "./views/searchView";

const state = {};

// ----------------- Search controller -----------------

// Display search results
const displaySearch = (page = 1) => {
  // Clear existing lists and page buttons
  searchView.clearResults();
  // Disply search results
  searchView.displayResults(state.search, page);
};

// Search recipes in API
const search = async () => {
  try {
    // Get input value
    const input = searchView.getSearchValue();
    if (input) {
      // Create search instance with API search results
      const search = new Search(input);
      state.search = await search.fetchResult();
      // Display results
      displaySearch();
    }
  } catch (error) {
    alert(error);
  }
};

// Get target page number from the closest page button
const pagenate = e => {
  if (e.target.closest("[data-page]")) {
    const targetPage = parseInt(e.target.closest("[data-page]").dataset.page);
    // Display results
    displaySearch(targetPage);
  }
};

dom.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  search();
});

dom.searchPages.addEventListener("click", pagenate);
