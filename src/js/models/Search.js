import axios from "axios";

export default class Search {
  constructor(keyword) {
    this.keyword;
  }

  async getResult() {
    try {
      const results = await axios.get(
        `https://forkify-api.herokuapp.com/api/search?q=${this.keyword}`
      );
      console.log(results);
    } catch (error) {
      alert(error);
    }
  }
}
