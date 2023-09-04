class GetAllPostsDto {
    constructor(model) {
        this.posts = model;
        this.allPostsDataLength = model.length;
    }
}

module.exports = GetAllPostsDto;
