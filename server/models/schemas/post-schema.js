const { Schema, model } = require('mongoose');

const AuthorSchema = {
    id: { type: String, required: true },
    email: { type: String, required: true },
};

const DateScheme = {
    day: {type: String, required: true},
    hour: {type: String, required: true}
}

const PostSchema = new Schema({
    author: { type: AuthorSchema, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    categories: {type: Array, required: true},
    comments: [{
        id: String,
        email: String,
        comment: String,
        rate: Number,
    }],
    rating: {type: "Number", required: true},
    createdAt: { type: DateScheme, required: true },
});

module.exports = model('Post', PostSchema);