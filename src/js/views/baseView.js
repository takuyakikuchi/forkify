/* ===========================================
This module contains common variables and functions as follows
- DOM strings
- name ellipsis function
============================================= */

// -------------- DOMstrings -----------------
export const dom = {
  search: document.querySelector(".search"),
  searchField: document.querySelector(".search__field"),
  results: document.querySelector(".results"),
  resultsList: document.querySelector("ul.results__list"),
  resultsPages: document.querySelector(".results__pages"),
};

// -------------- <Private> Common functions -------------

// -------------- <Exposed> Common functions -------------
export const displayLoader = () => {
  const loader = `<div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>`;
  dom.results.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loaderDOM = document.querySelector(".loader");
  loaderDOM.parentNode.removeChild(loaderDOM);
};

export const ellipsis = (name, length) => {
  if (name.length >= length) return name.substring(0, length) + "...";
  return name;
};
