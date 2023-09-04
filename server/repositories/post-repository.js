const Post = require('../models/schemas/post-schema');

const PostsSortAndFilterGet = {
    rating: async (page, limit, filter) => {
        const filterFirstOption = filter[0];
        const filterSecondOption = filter[1];
        const filterCriteria = {};

        if(filterFirstOption === "categories") {
            filterCriteria[filterFirstOption] = filterSecondOption;
        }

        if(filterFirstOption === "author") {
            filterCriteria['author.email'] = filterSecondOption;
        }

        return await Post.find(filterCriteria)
            .sort({'rating': -1})
            .skip((page - 1) * limit)
            .limit(limit);
    },
    creationDate: async (page, limit, filter) => {
        const filterFirstOption = filter[0] || 'categories';
        const filterSecondOption = filter[1] || 'general';
        const filterCriteria = {};

        if(filterFirstOption === "categories") {
            filterCriteria[filterFirstOption] = filterSecondOption;
        }

        if(filterFirstOption === "author") {
            filterCriteria['author.email'] = filterSecondOption;
        }

        return await Post.find(filterCriteria)
            .sort({'createdAt.day': -1, 'createdAt.hour': -1})
            .skip((page - 1) * limit)
            .limit(limit);
    }
}

class PostRepository {
    async create(createdPostDto) {
        try {
            const post = await Post.create(createdPostDto);
            return post;
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(page, limit, sort, filter) {
        try {
            const totalPosts = await Post.countDocuments();

            const posts = await PostsSortAndFilterGet[sort.toString()](page,limit, filter);

            return {posts, totalPosts};
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(postId) {
        const post = await Post.findById(postId);
        return post;
    }

    async delete(postId) {
        const post = await Post.findByIdAndDelete(postId);
        return post;
    }

    async update(updatedPost) {
        const post = await Post.findByIdAndUpdate(updatedPost._id, updatedPost);
        return post;
    }

    async search(searchQuery, selectedKey) {
        if (selectedKey === 'comments') {
            const posts = await Post.find(
                {
                    ['comments.comment']: {$regex: searchQuery, $options: 'i'},
                }
            );
        }

        const posts = await Post.find({
            [selectedKey]: {$regex: searchQuery, $options: 'i'},
        });

        return posts;
    }
}

module.exports = new PostRepository();