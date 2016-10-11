const fs = require('fs');
const path = require('path');

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'ggUPwP_8iA0dcFzOhungqQ',
  consumer_secret: 's3MB4Bsb8o4LCb5qwZpnKlvJzbw',
  token: 'RnQ_aK6cZpipSuF_UGDSSz-XfYyBO0q5',
  token_secret: 'KeXQoFe0m-d0Kh8AFjIRiSP72Jc',
});

exports.search = function(search, location, cb) {

  yelp.search({ term: search, location: location })
  .then(function (data) {
    // console.log(data);
    cb(null, data);
  })
  .catch(function (err) {
    cb(err);
    console.error(err);
  });
}

exports.businessLookup = function(id, cb) {
  yelp.business(id)
  .then(data => {
    cb(null, data)
  })
  .catch(function (err) {
    cb(err);
    console.error(err);
  });
}

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
