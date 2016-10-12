const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '../data/favorites.json')

exports.getAll = function(cb) {
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);

    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
    }

    cb(null, data);
  });
}

exports.add = function(newData, cb) {
  let json = JSON.stringify(newData);
  fs.writeFile(filename, json, cb)
}

exports.create = function(newItem, cb) {
  exports.getAll((err, items) => {
    if(err) return cb(err);

    items.push(newItem);

    exports.add(items, cb);
  })
}

exports.remove = function(id, cb) {
   exports.getAll((err, items) =>{
     if(err) return cb(err);
     let newTweets = items.filter(tweet => {
      return tweet.id !== id;
     })
     console.log('newTweets', newTweets)
     exports.add(newTweets, cb);
   })
}
