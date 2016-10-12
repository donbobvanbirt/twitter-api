import API from '../API'

const TwitterActions = {
  search(name) {
    API.search(name);
  },

  favorite(tweet) {
    API.favorite(tweet);
  }
}

export default TwitterActions;
