import API from '../API';

const TwitterActions = {
  search(name) {
    API.search(name);
  },

  favorite(tweet) {
    API.favorite(tweet);
  },

  getFavs() {
    API.getFavs();
  },

unfavorite(id) {
  API.unfavorite(id);
}
}

export default TwitterActions;
