/* ===========================================
This module contains common variables and functions as follows
- DOM strings
- name ellipsis function
============================================= */

// -------------- DOMstrings -----------------
export const dom = {
  searchInput: document.querySelector(".search__field"),
  searchField: document.querySelector(".search"),
  searchResults: document.querySelector("ul.results__list")
};

export const ellipsis = (name, length) => {
  if (name.length >= length) return name.substring(0, length) + "...";
  return name;
};
