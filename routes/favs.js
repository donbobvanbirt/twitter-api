const express = require('express');
const router = express.Router();

const Tweets = require('../models/tweets');

router.post('/add/', (req, res) => {
  // let { tweet } = req.params;
  Tweets.create(req.body, err => {
    if(err) return res.status(400).send(err);
    console.log('tweet in favs.js', req.body);
    res.send('tweet added');
  })
})

module.exports = router;
