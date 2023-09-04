const PostRepository = require('../repositories/post-repository');
const { getDateInfo } = require('../utils/index');
const CreatePostDto = require('../models/dtos/create-post-dto');
const GetAllPostsDto = require('../models/dtos/getAll-posts-dto');

class PostService {
    async create(postData) {
        const createdPostDto = new CreatePostDto(postData);
        const post = await PostRepository.create(createdPostDto);
        return post;
    }

    async getAll(page, limit, sort, filter) {
        try {
            const postsData = await PostRepository.getAll(page, limit, sort, filter);
            return postsData;
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(postId) {
        const post = await PostRepository.getOne(postId);
        return post;
    }

    async delete(postId) {
        const post = await PostRepository.delete(postId);
        return post;
    }

    async update(updatedPost) {
        const ratings = updatedPost.comments.map((comment) => {
            return comment.rate
        });
        const averageRating = (ratings.reduce((acc, rate) => acc + rate, 0)) / ratings.length || 0;
        const post = await PostRepository.update({ ...updatedPost, rating: averageRating });
        return post;
    }

    async search(searchQuery, selectedKey) {
        const posts = await PostRepository.search(searchQuery, selectedKey);
        return posts;
    }
}

module.exports = new PostService();