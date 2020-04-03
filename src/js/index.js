// ----------------- Global controller -----------------
import Search from "./models/Search";
import { dom } from "./views/baseView";
import * as searchView from "./views/searchView";

const state = {};

// ----------------- Search controller -----------------

// Search recipes in API and display them in the list
const search = async () => {
  try {
    // Get input value
    const input = searchView.getSearchValue();
    if (input) {
      // Create search instance with API search results
      const search = new Search(input);
      state.search = await search.fetchResult();
      // Disply search results
      searchView.displayResults(state.search);
    }
  } catch (error) {
    alert(error);
  }
};

const pagenate = e => {
  const targetPage = parseInt(e.target.closest("[data-page]").dataset.page);
  searchView.displayResults(state.search, targetPage);
};

dom.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  search();
});

dom.searchPages.addEventListener("click", pagenate);
