const PostService = require('../service/post-service');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');


class PostController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error on validation', errors.array()));
            }
            const postData = req.body;
            const post = await PostService.create(postData);
            res.status(201).json({success: true, post});
        } catch (e) {
            next(e.message);
        }
    }

    async update(req, res, next) {
        try {
            const updatedPost = req.body;
            const post = await PostService.update(updatedPost);
            res.status(200).json(post);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const filterSetting = req.query.filter.split(',') || ['categories', 'general'];
            const sortSetting = req.query.sort || 'creationDate';

            const posts = await PostService.getAll(page, limit, sortSetting, filterSetting);
            res.json(posts);
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async getOne(req, res) {
        const postId = req.query.id;
        const post = await PostService.getOne(postId);
        return res.status(200).json(post);
    }

    async delete(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error on validation', errors.array()));
            }
            const postId = req.query.id;
            const post = await PostService.delete(postId);
            return res.status(200).json(post);
        } catch (e) {
            next(ApiError.ServerSideError(e.message));
        }
    }

    async search(req, res, next) {
        const searchQuery = req.query.q;
        const selectedKey = req.query.key; // 'title', 'body', or 'comments'
        try {
            const posts = await PostService.search(searchQuery, selectedKey);
            const postsData = {posts, totalPosts: posts.length};
            res.json(postsData);
        } catch (e) {
            next(ApiError.NotFound(e.message));
        }
    }
}

module.exports = new PostController();