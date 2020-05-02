// =========================================
// Recipe Model
// =========================================

// For http request
import axios from "axios";

// For Babel ES6 functions
import "core-js/stable";
import "regenerator-runtime/runtime";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async fetchRecipe() {
    try {
      const response = await axios.get(
        `http://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = response.data.recipe.title;
      this.publisher = response.data.recipe.publisher;
      this.img = response.data.recipe.image_url;
      this.url = response.data.recipe.source_url;
      this.ingredients = response.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  // Preparation time(assuming it needs 15 min for each 3 ingredients)
  calculateTime() {
    if (!this.ingredients) return;
    const numberOfIngredients = this.ingredients.length;
    this.time = Math.ceil(numberOfIngredients / 3) * 15;
  }

  // Set 4 servings as default and it will not be changed
  setServings() {
    if (!this.ingredients) return;
    this.servings = 4;
  }
}
