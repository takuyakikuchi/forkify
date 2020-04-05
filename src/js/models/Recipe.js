import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async fetchRecipe() {
    try {
      const recipe = await axios.get(
        `http://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.recipe = recipe.data.recipe;
      this.calcurateTime();
      return this.recipe;
    } catch (error) {
      alert(error);
    }
  }

  calcurateTime() {
    // Assuming we need 15 min for each 3 ingredients
    const numberOfIngredients = this.recipe.ingredients.length;
    this.recipe.time = Math.ceil(numberOfIngredients / 3) * 15;
  }
}
