import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _searchResults = null;
let _businessInfo = null;

class YelpStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_SEARCH':
          _searchResults = action.payload.data;
          // console.log('searchResults in store', _searchResults);
          this.emit('CHANGE');
          break;
        case 'RECEIVE_INFO':
          _businessInfo = action.payload.data;
          // console.log('_businessInfo', _businessInfo)
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb)
  }

  getSearch() {
    return _searchResults;
  }

  getInfo() {
    return _businessInfo;
  }
}

export default new YelpStore;
