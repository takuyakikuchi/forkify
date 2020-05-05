// =========================================
// Shopping List View
// =========================================

import { dom } from "./baseView";

// ---------------- Private functions ------------

const renderListItem = (item) => {
  const li = `<li class="shopping__item">
                <p class="shopping__description">${item}</p>
                <button class="shopping__delete btn-tiny">
                  <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                  </svg>
                </button>
            </li>`;
  dom.shoppingList.insertAdjacentHTML("beforeend", li);
};

// ---------------- Export functions -------------

// @ingredients: Ingredients list from shoppingList state
export const displayShoppingList = (ingredients) => {
  ingredients.forEach((item) => {
    renderListItem(item);
  });
};

// @li: Selected li DOM element
export const deleteItem = (li) => {
  li.parentNode.removeChild(li);
};
