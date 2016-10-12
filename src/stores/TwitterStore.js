import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _searchResults = null;
let _favorites = null;
// let _businessInfo = null;

class TwitterStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_SEARCH':
          _searchResults = action.payload.data;
          // console.log('searchResults in store', _searchResults);
          this.emit('CHANGE');
          break;
        case 'RECEIVE_FAVS':
          _favorites = action.payload.data;
          // console.log('favs in store:', _favorites);
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getSearch() {
    return _searchResults;
  }

  getFavorites() {
    return _favorites;
  }
}

export default new TwitterStore;
