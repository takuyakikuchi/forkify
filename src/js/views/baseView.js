/* ===========================================
This module contains common variables and functions as follows
- DOM strings object
- Common functions
  - name ellipsis
  - display loader, clear loader
============================================= */

// -------------- DOMstrings -----------------
export const dom = {
  search: document.querySelector(".search"),
  searchField: document.querySelector(".search__field"),
  results: document.querySelector(".results"),
  resultsList: document.querySelector("ul.results__list"),
  resultsPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
};

// -------------- <Private> Common functions -------------

// -------------- <Exposed> Common functions -------------
export const displayLoader = (target) => {
  const loader = `<div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>`;
  target.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loaderDOM = document.querySelector(".loader");
  if (loaderDOM) loaderDOM.parentNode.removeChild(loaderDOM);
};

export const ellipsis = (name, length /* length before ellipsis */) => {
  if (name.length >= length) return name.substring(0, length) + "...";
  return name;
};
