const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    title: {
    type: String,
    required: true
    },

    url: {
    type: String,
    required: true
    },

    imageUrl: {
        type: String,
        required: false
    },

    author: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: true,
    }

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;