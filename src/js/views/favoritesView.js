// =========================================
// Favorites View
// =========================================

import { dom, ellipsis } from "./baseView";

// --------------- Private functions -------------

const renderFavorites = (recipe) => {
  const li = `<li>
      <a class="likes__link" href="#${recipe.id}">
        <figure class="likes__fig">
          <img src="${recipe.img}" alt="${recipe.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${ellipsis(recipe.title, 20)}</h4>
          <p class="likes__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>`;
  dom.likesList.insertAdjacentHTML("beforeend", li);
};

// --------------- Export functions -------------

// @favorite: array of recipe in favorites
export const displayFavorites = (favorites) => {
  if (!favorites) return;

  favorites.forEach((recipe) => {
    renderFavorites(recipe);
  });
};
