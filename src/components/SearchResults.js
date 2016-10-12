import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import TwitterStore from '../stores/TwitterStore';
import TwitterActions from '../actions/TwitterActions';

export default class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      results: TwitterStore.getSearch(),
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    TwitterStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TwitterStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      results: TwitterStore.getSearch(),
    });
  }

  _favorite(id, text) {
    console.log('id', 'text', id, text);
    const tweet = {
      id,
      text,
    };
    TwitterActions.favorite(tweet);
  }

  render() {
    let resultsList = '';
    if (this.state.results) {
      const { statuses } = this.state.results;
      resultsList = statuses.map((tweet, i) => {
        let { text, id_str } = tweet;
        return (
          <tr id="cool" key={i}>
            <td>{text}</td>
            <td><button onClick={() => this._favorite(id_str, text)} className="btn btn-default"><span className="glyphicon glyphicon-star-empty" /></button></td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className="table">
          <tbody>
            {resultsList}
          </tbody>
        </table>
      </div>
    );
  }

}
