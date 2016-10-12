const fs = require('fs');
const path = require('path');

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '	',
  access_token_secret: ''
});

exports.search = function(search, cb) {

  let params = { screen_name: 'node.js' }
  client.get('search/tweets', params, function(error, tweets, response) {
    if(error) {cb(error)}
    console.log('tweets', tweets);
    cb(null, tweets);
  });

  // twitter.search({ term: search, location: location })
  // .then(function (data) {
  //   // console.log(data);
  //   cb(null, data);
  // })
  // .catch(function (err) {
  //   cb(err);
  //   console.error(err);
  // });
}

// exports.businessLookup = function(id, cb) {
//   twitter.business(id)
//   .then(data => {
//     cb(null, data)
//   })
//   .catch(function (err) {
//     cb(err);
//     console.error(err);
//   });
// }

// const filename = path.join(__dirname, '../data/clogs.json');



// getAll = read from file, parse the data
// write = stringigy some data, write the data string to the filename

// create - push new item



// exports.write = function(newData, cb) {
//   let json = JSON.stringify(newData);
//
//   fs.writeFile(filename, json, cb);
// }
//
// exports.create = function(newItem, cb) {
//
//   exports.getAll((err, items) => {
//     if(err) return cb(err);
//
//     items.push(newItem);
//
//     exports.write(items, cb);
//   })
//
// }
