/* ===========================================
This module contains common variables and functions as follows
- DOM strings
- name ellipsis function
============================================= */

// -------------- DOMstrings -----------------
export const dom = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResults: document.querySelector("ul.results__list"),
  searchPages: document.querySelector(".results__pages")
};

export const ellipsis = (name, length) => {
  if (name.length >= length) return name.substring(0, length) + "...";
  return name;
};
