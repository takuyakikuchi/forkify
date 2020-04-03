import { dom, ellipsis } from "./baseView";

export const getSearchValue = () => dom.searchInput.value;

export const displayResults = results => {
  const html = results
    .map(result => {
      return `<li>
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
    })
    .join("");
  dom.searchResults.insertAdjacentHTML("afterbegin", html);
};
