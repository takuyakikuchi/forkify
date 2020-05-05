// =========================================
// Shopping List Model
// =========================================

export default class ShoppingList {
  constructor() {
    this.list = [];
  }

  addToList(ingredients) {
    this.list.push(...ingredients);
  }

  removeFromList() {}
}
