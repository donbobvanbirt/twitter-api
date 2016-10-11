import axios, { get, post, delete } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  search(name, location) {

    get(`/search?search=${name}&location=${location}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data);
      ServerActions.receiveSearch(data);
    })
    .catch(console.error);
  },

  getInfo(id) {
    get(`/business/${id}`)
    .then(res => {
      let { data } = res;
      // console.log("data", data);
      ServerActions.receiveInfo(data);
    })
  }
}

export default API;
