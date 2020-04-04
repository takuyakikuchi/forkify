export class Recipe {
  constructor(arg) {
    this.id = arg.id;
    this.title = arg.title;
    this.ingredients = arg.ingredients;
    this.publisher = arg.publisher;
    this.imageURL = arg.imageURL;
    this.sourceURL = arg.sourceURL;
    this.publisherURL = arg.publisherURL;
    this.socialRank = arg.socialRank;
  }
}
