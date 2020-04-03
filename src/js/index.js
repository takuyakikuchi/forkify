// ----------------- Global controller -----------------
import { dom } from "./views/baseView";
import * as searchView from "./views/searchView";

// ----------------- Search controller -----------------

const search = async () => {
  const input = searchView.getSearchValue();
};

dom.searchField.addEventListener("submit", e => {
  e.preventDefault();
  search();
});
