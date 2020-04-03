// ----------------- Global controller -----------------
import Search from "./models/Search";
import { dom } from "./views/baseView";
import * as searchView from "./views/searchView";

// ----------------- Search controller -----------------

// Search recipes in API and display them in the list
const search = async () => {
  try {
    // Get input value
    const input = searchView.getSearchValue();
    if (input) {
      // Create search instance with API search results
      const search = new Search(input);
      const results = await search.getResult();
      // Disply search results
      searchView.displayResults(results);
    }
  } catch (error) {
    alert(error);
  }
};

dom.searchField.addEventListener("submit", e => {
  e.preventDefault();
  search();
});
