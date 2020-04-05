// =========================================
// Search View
// =========================================

import { dom, ellipsis } from "./baseView";

// --------------- Private functions -------------

// Render results
const renderResult = (result) => {
  const li = `<li data-id="${result.recipe_id}">
      <a class="results__link" href="#${result.recipe_id}">
        <figure class="results__fig">
          <img src="${result.image_url}" alt="${result.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${ellipsis(result.title, 20)}</h4>
          <p class="results__author">${result.publisher}</p>
        </div>
      </a>
    </li>`;
  dom.resultsList.insertAdjacentHTML("beforeend", li);
};

// Render buttons
const renderButton = (currentPage, pageTotal) => {
  // Assign necessary pages
  let pages;
  if (currentPage === 1) {
    pages = ["next"];
  } else if (currentPage === pageTotal) {
    pages = ["prev"];
  } else {
    pages = ["prev", "next"];
  }

  // Render buttons based on the current page
  const pageButton = pages
    .map((page) => {
      return `<button class="btn-inline results__btn--${page}" data-page="${
        page === "prev" ? currentPage - 1 : currentPage + 1
      }">
        <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            page === "prev" ? "left" : "right"
          }"></use>
        </svg>
        <span>Page ${page === "prev" ? currentPage - 1 : currentPage + 1}</span>
      </button>`;
    })
    .join("");
  dom.resultsPages.insertAdjacentHTML("afterbegin", pageButton);
};

// --------------- Export functions -------------

// Render results based on the page setting
export const displayResults = (search, page = 1, maxShow = 10) => {
  if (search) {
    // Limiting the number of results according to the page setting
    const targetResults = search.results.slice(
      maxShow * (page - 1),
      maxShow * page
    );

    // Render the results
    targetResults.forEach((result) => {
      renderResult(result);
    });

    // Render buttons unless pageTotal is 1
    const pageTotal = Math.ceil(search.results.length / maxShow);
    if (pageTotal !== 1) renderButton(page, pageTotal);
  }
};

// Clear results(lists and buttons)
export const clearResults = () => {
  const elements = [dom.resultsList, dom.resultsPages];
  elements.forEach((element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
};

// Get serch value
export const getSearchValue = () => dom.searchField.value;
