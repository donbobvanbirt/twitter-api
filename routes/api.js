const express = require('express');
const router = express.Router();
require('dotenv').config();


var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/search', (req, res) => {

  let { search } = req.query;
  console.log('search', search);
  client.get('search/tweets', {q: `${search}`}, function(error, tweets, response) {
    if(error) {res.send(error)}
    console.log('tweets', tweets);
    res.send(tweets);
  });

})

module.exports = router;
