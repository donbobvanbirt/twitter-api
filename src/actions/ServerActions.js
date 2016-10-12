import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveSearch(data) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_SEARCH',
      payload: { data },
    });
  },

  receiveFavs(data) {
    // console.log('data in ServerActions:', data);
    AppDispatcher.dispatch({
      type: 'RECEIVE_FAVS',
      payload: { data },
    });
  },
};

export default ServerActions;
