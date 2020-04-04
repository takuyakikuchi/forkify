import { dom, ellipsis } from "./baseView";

export const getSearchValue = () => dom.searchField.value;

const renderResult = (result) => {
  const li = `<li>
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

export const displayResults = (results, page = 1, maxShow = 10) => {
  if (results) {
    // Render results according to the page setting
    const targetResults = results.slice(maxShow * (page - 1), maxShow * page);
    targetResults.forEach((result) => {
      renderResult(result);
    });
    // Render buttons unless pageTotal is 1
    const pageTotal = Math.ceil(results.length / maxShow);
    if (pageTotal !== 1) renderButton(page, pageTotal);
  }
};

export const clearResults = () => {
  // Clear targets are lists and buttons
  const elements = [dom.resultsList, dom.resultsPages];
  elements.forEach((element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
};
