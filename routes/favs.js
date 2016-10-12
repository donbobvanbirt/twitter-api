const express = require('express');
const router = express.Router();

const Tweets = require('../models/tweets');

router.get('/getAll/', (req, res) => {
  Tweets.getAll((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  })
})

router.post('/add/', (req, res) => {
  // let { tweet } = req.params;
  Tweets.create(req.body, err => {
    if(err) return res.status(400).send(err);
    console.log('tweet in favs.js', req.body);
    res.send('tweet added');
  })
})

router.delete('/unfavorite/:id', (req, res) => {

 Tweets.remove(req.params.id, err => {
   if(err) return res.status(400).send(err);
   res.send('deleted');
 })
})

module.exports = router;
