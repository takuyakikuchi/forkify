/* ===========================================
This module contains common variables and functions as follows
- DOM strings
- name ellipsis function
============================================= */

// -------------- DOMstrings -----------------
export const dom = {
  search: document.querySelector(".search"),
  searchField: document.querySelector(".search__field"),
  resultsList: document.querySelector("ul.results__list"),
  resultsPages: document.querySelector(".results__pages"),
};

// -------------- Common functions -------------
export const ellipsis = (name, length) => {
  if (name.length >= length) return name.substring(0, length) + "...";
  return name;
};

// const renderLoader = () => {
//   const html = `<div class="loader">
//       <svg>
//         <use href="img/icons.svg#icon-cw"></use>
//       </svg>
//     </div>`;
// };

// export const displayLoader = () => {
//   renderLoader;
// };
