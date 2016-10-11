import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import YelpActions from '../actions/YelpActions'
import SearchResults from './SearchResults'

export default class Search extends Component {
  constructor() {
    super();
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(e) {
    e.preventDefault();
    let { name, location } = this.refs;
    // console.log('clicked!', name.value, location.value)
    YelpActions.search(name.value, location.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch} className="form-inline">
          <div className="form-group">
            <label htmlFor="business-name">Search:</label>
            <input ref="name" className="form-control" type="text" id="business-name" placeholder="Business name" required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input ref="location" className="form-control" type="text" id="location" placeholder="San Francisco" required />
          </div>
          <button className="btn btn-default">Search</button>
        </form>
        <SearchResults/>
      </div>
    )
  }
}
