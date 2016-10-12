const PORT = 8000;

const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const router = express.Router();
// require('dotenv').config();
const webpackConfig = require('./webpack.config');

// var Twitter = require('twitter');
//
// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

const app = express();

//  APP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// WEBPACK CONFIGURATION
const compiler = webpack(webpackConfig);
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  hot: true,
  path: webpackConfig.output.path
}));

app.use('/api', require('./routes/api'));

// app.get('/search', (req, res) => {
//
//   let { search } = req.query;
//   console.log('search', search);
//   client.get('search/tweets', {q: `${search}`}, function(error, tweets, response) {
//     if(error) {res.send(error)}
//     console.log('tweets', tweets);
//     res.send(tweets);
//   });
//
// })


// app.get('/business/:id', (req, res) => {
//   let { id } = req.params;
//   // console.log('id', id);
//   Twitter.businessLookup(id, (err, data) => {
//     if(err) return res.status(400).send(err);
//
//     res.send(data);
//   })
// })

// // using url params. id is dynamic portion
// app.get('/clogs/:id', (req, res) => {
//
//   console.log('req.params.id:', req.params.id);
//   console.log('req.query:', req.query);
//
//   res.send(req.params.id);

app.use("*", function(request, response) {
  //send the index.html
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
