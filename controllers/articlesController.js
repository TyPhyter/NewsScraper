const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');
const request = require('request');

var mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create');
const Article = require('../models/Article');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/articles/:id?', (req, res) => {
    const id = req.params.id || null;
    if(id) {
        //send the info for a specific article
    }
    else {
        const articles = [];
        //sort by most recent insertion first
        Article.find({}).sort({ '_id' : -1 })
            .then((docs) => {
                docs.forEach((doc) => {
                    articles.push(doc);
                });
            })
            .catch((err) =>{
                console.log(err);
            });
        res.render('allArticles', {articles});
    }
});


router.post('/scrape', (req, res) => {
    request("https://techcrunch.com/", function(error, response, html) {
        // console.log(html);
        const $ = cheerio.load(html);
        const results = [];
        const articles = $('.post-block');
        // console.log(articles);
        articles.each(function (i, element) {
            // console.log(element);
            let article = {};
            article.title = $(this).find('h2.post-block__title').text().trim();
            article.summary = $(this).find('div.post-block__content').text().trim();
            article.author = $(this).find('span.river-byline__authors').text().trim();
            article.url = $(this).find('a.post-block__title__link').attr('href').trim();
            //if the image exists
            if($(this).find('footer img').attr('src')){
                article.imgUrl = $(this).find('footer img').attr('src').split(/w=1[0-9][0-9][0-9][?]/).join('');
            }
            // console.log(article);
            results.push(article);
            //create new article ONLY IF no article with the same title exists
            Article.findOrCreate({ title: article.title }, article, (err, doc) => {
                if(err) console.log(err);
                console.log(doc);
            });
                
        });
        
        res.json(results);

    });
});

module.exports = router;