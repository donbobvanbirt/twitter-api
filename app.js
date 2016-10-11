const PORT = 8000;

const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');

const Yelp = require('./models/yelp');

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


app.get('/search', (req, res) => {
  let { search, location } = req.query;
  // console.log('search', search, 'location', location);
  Yelp.search(search, location, (err, data) => {
    if(err) return res.status(400).send(err);

    res.send(data);
  })
})

app.get('/business/:id', (req, res) => {
  let { id } = req.params;
  // console.log('id', id);
  Yelp.businessLookup(id, (err, data) => {
    if(err) return res.status(400).send(err);

    res.send(data);
  })
})

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
