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
  // newItem.id = uuid();
  exports.getAll((err, items) => {
    if(err) return cb(err);

    items.push(newItem);

    exports.add(items, cb);
  })
}

// if(!app.working) {
//   make.app(work)
// }
