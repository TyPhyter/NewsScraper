const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');

const ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: true,
    },

    imgUrl: {
        type: String
    },

    comments: {
        type: [String]
    }

});

ArticleSchema.plugin(findOrCreate);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;