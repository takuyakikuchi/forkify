// =========================================
// Recipe Model
// =========================================

import axios from "axios";
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
  calcurateTime() {
    const numberOfIngredients = this.ingredients.length;
    this.time = Math.ceil(numberOfIngredients / 3) * 15;
  }

  // Initial setting for searvings
  setServings() {
    this.servings = 4;
  }

  // Update searvings
  updateServings(method) {
    if (method === "decrease") {
      if (this.servings <= 1) return;
      this.servings -= 1;
    } else if (method === "increase") {
      this.servings += 1;
    }
  }

  //   parseIngredients() {
  //     const unitsLong = [
  //       "tablespoons",
  //       "tablespoon",
  //       "ounces",
  //       "ounce",
  //       "teaspoons",
  //       "teaspoon",
  //       "cups",
  //       "pounds",
  //     ];
  //     const unitsShort = [
  //       "tbsp",
  //       "tbsp",
  //       "oz",
  //       "oz",
  //       "tsp",
  //       "tsp",
  //       "cup",
  //       "pound",
  //     ];
  //     const units = [...unitsShort, "kg", "g"];

  //     const newIngredients = this.ingredients.map((el) => {
  //       // 1) Uniform units
  //       let ingredient = el.toLowerCase();
  //       unitsLong.forEach((unit, i) => {
  //         ingredient = ingredient.replace(unit, unitsShort[i]);
  //       });

  //       // 2) Remove parentheses
  //       ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

  //       // 3) Parse ingredients into count, unit and ingredient
  //       const arrIng = ingredient.split(" ");
  //       const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

  //       let objIng;
  //       if (unitIndex > -1) {
  //         // There is a unit
  //         // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
  //         // Ex. 4 cups, arrCount is [4]
  //         const arrCount = arrIng.slice(0, unitIndex);

  //         let count;
  //         if (arrCount.length === 1) {
  //           count = eval(arrIng[0].replace("-", "+"));
  //         } else {
  //           count = eval(arrIng.slice(0, unitIndex).join("+"));
  //         }

  //         objIng = {
  //           count,
  //           unit: arrIng[unitIndex],
  //           ingredient: arrIng.slice(unitIndex + 1).join(" "),
  //         };
  //       } else if (parseInt(arrIng[0], 10)) {
  //         // There is NO unit, but 1st element is number
  //         objIng = {
  //           count: parseInt(arrIng[0], 10),
  //           unit: "",
  //           ingredient: arrIng.slice(1).join(" "),
  //         };
  //       } else if (unitIndex === -1) {
  //         // There is NO unit and NO number in 1st position
  //         objIng = {
  //           count: 1,
  //           unit: "",
  //           ingredient,
  //         };
  //       }

  //       return objIng;
  //     });
  //     this.ingredients = newIngredients;
  //   }
}
