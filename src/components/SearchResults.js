import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import YelpStore from '../stores/YelpStore'
import YelpActions from '../actions/YelpActions'

export default class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      results: YelpStore.getSearch()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    // let { id } = this.props.params;
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    YelpStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      results: YelpStore.getSearch()
    })
  }

  _getInfo(id) {
    // console.log('id', id);
    browserHistory.push(`/detail/${id}`);
  }

  render() {
    // let businesses = [];
    let resultsList = '';
    if(this.state.results) {
      let { businesses } = this.state.results;
      resultsList = businesses.map((bus, i) => {
        let { name, location, id } = bus;
        return (
          <tr key={i}>
            <td>{name}</td>
            <td>{location.city}, {location.state_code}</td>
            <td><button onClick={() => this._getInfo(id)} className="btn btn-default"><span className="glyphicon glyphicon-info-sign"></span></button></td>
          </tr>
        )
      })
    }
    // let businesses = this.state.results.business || [];
    console.log("this.state", this.state);
    // console.log("businesses[0]", businesses[0]);

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {resultsList}
          </tbody>
        </table>
      </div>
    )
  }

}
