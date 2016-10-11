import API from '../API'

const YelpActions = {
  search(name, location) {
    API.search(name, location);
  },

  getInfo(id) {
    // console.log('id in actions:', id);
    API.getInfo(id);
  }
}

export default YelpActions;
