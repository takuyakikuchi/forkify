// ----------------- Global controller -----------------
import Search from "./models/Search";
import { dom } from "./views/baseView";
import * as searchView from "./views/searchView";

// ----------------- Search controller -----------------

const search = async () => {
  try {
    const input = searchView.getSearchValue();
    if (input) {
      const search = new Search();
      search.getResult(input);
    }
  } catch (error) {
    alert(error);
  }
};

dom.searchField.addEventListener("submit", e => {
  e.preventDefault();
  search();
});
