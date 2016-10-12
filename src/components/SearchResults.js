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
    // let { id } = this.props.params;
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

  // _getInfo(id) {
  //   // console.log('id', id);
  //   browserHistory.push(`/detail/${id}`);
  // }

  _favorite(id, text) {
    console.log('id', 'text', id, text);
    const tweet = {
      id,
      text,
    };
    // console.log('tweet in sr:', tweet);
    TwitterActions.favorite(tweet);
  }

  render() {
    // console.log('this state', this.state);
    // let tweetinesses = [];
    let resultsList = '';
    if (this.state.results) {
      const { statuses } = this.state.results;
      resultsList = statuses.map((tweet, i) => {
        let { text, id_str } = tweet;
        return (
          <tr id="cool" key={i}>
            <td>{text}</td>
            <td><button onClick={() => this._favorite(id_str, text)} className="btn btn-default"><span className="glyphicon glyphicon-star-empty" /></button></td>
            {/* <td>{location.city}, {location.state_code}</td>
            <td><button onClick={() => this._getInfo(id)} className="btn btn-default"><span className="glyphicon glyphicon-info-sign"></span></button></td> */}
          </tr>
        );
      });
    }
    // let statuses = this.state.results.tweetiness || [];
    console.log('this.state', this.state);
    // console.log("statuses[0]", statuses[0]);

    return (
      <div>
        <table className="table">
          <thead>
            {/* <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Info</th>
            </tr> */}
          </thead>
          <tbody>
            {resultsList}
          </tbody>
        </table>
      </div>
    );
  }

}
