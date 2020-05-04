// =========================================
// Favorites Model
// =========================================

export default class Favorites {
  constructor() {
    this.list = [];
  }

  loadFromStorage() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) this.list = favorites;
  }

  // @recipe: recipe object, not Recipe class
  addToList(recipe) {
    this.list.push(recipe);
    // Overwrite localStorage
    localStorage.clear();
    localStorage.setItem("favorites", JSON.stringify(this.list));
  }
}
