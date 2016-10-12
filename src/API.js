import axios, { get, post, delete } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  search(search) {

    get(`api/search?search=${search}`)
    .then(res => {
      let { data } = res;
      console.log("data", data);
      ServerActions.receiveSearch(data);
    })
    .catch(console.error);
  },

  favorite(tweet) {
    post(`/favs/add`, tweet)
    .then(res => {
      let { data } = res;
      console.log("data", data);
    })
    .catch(console.error);
  },

  getFavs() {
    get('favs/getAll')
    .then(res => {
      let { data } = res;
      console.log("data", data);
      ServerActions.receiveFavs(data);
    })
    .catch(console.error);
  }
}

export default API;
