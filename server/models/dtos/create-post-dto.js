const { getDateInfo } = require('../../utils/index');

class CreatePostDto {
    constructor(model) {
        this.author = model.author;
        this.title = model.title;
        this.body = model.body;
        this.categories = model.categories;
        this.comments = [];
        this.createdAt = getDateInfo();
        this.rating = 0;
    }
}

module.exports = CreatePostDto;