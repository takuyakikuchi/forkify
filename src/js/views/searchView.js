import { dom, ellipsis } from "./baseView";

export const getSearchValue = () => dom.searchInput.value;

const renderResult = result => {
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
  dom.searchResults.insertAdjacentHTML("beforeend", li);
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
    .map(page => {
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
  dom.searchPages.insertAdjacentHTML("afterbegin", pageButton);
};

export const displayResults = (results, page = 2, maxShow = 10) => {
  // Reassign results according to maxShow setting
  const targetResults = results.slice(maxShow * (page - 1), maxShow * page);
  targetResults.forEach(result => {
    renderResult(result);
  });
  // Calcurating total number of pages
  const pageTotal = Math.ceil(results.length / maxShow);
  // Render page button unless pageTotal is 1
  if (pageTotal !== 1) renderButton(page, pageTotal);
};
