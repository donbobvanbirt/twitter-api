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
app.use('/favs', require('./routes/favs'));

app.use("*", function(request, response) {
  //send the index.html
  response.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
