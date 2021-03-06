import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TwitterActions from '../actions/TwitterActions';
import SearchResults from './SearchResults';

export default class Search extends Component {
  constructor() {
    super();
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(e) {
    e.preventDefault();
    const { name } = this.refs;
    TwitterActions.search(name.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch} className="form-inline">
          <div className="form-group">
            <label htmlFor="business-name">Search:</label>
            <input ref="name" className="form-control" type="text" id="business-name" placeholder="Search Twitter" required />
          </div>

          <button className="btn btn-default">Search</button>
        </form>
        <SearchResults />
      </div>
    );
  }
}
