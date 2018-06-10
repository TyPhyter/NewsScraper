const express = require('express');
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");
//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// const BURG = require('../models/burger');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/articles/:id?', (req, res) => {
    const id = req.params.id || null;
    if(id) {
        //send the info for a specific article
    }
    else {
        //send the info for all articles
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
            console.log(element);
            let article = {}; $(this)
            article.title = $(this).find('h2.post-block__title').text().trim();
            article.summary = $(this).find('div.post-block__content').text().trim();
            article.author = $(this).find('span.river-byline__authors').text().trim();
            article.url = $(this).find('a.post-block__title__link').attr('href').trim();
            results.push(article);
        });

        res.json(results);

    });
});

module.exports = router;