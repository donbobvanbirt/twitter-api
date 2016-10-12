import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import TwitterStore from '../stores/TwitterStore'
import TwitterActions from '../actions/TwitterActions'

export default class TwitterFavorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: TwitterStore.getFavorites()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    TwitterStore.startListening(this._onChange);
    TwitterActions.getFavs();
  }

  componentWillUnmount() {
    TwitterStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      favorites: TwitterStore.getFavorites()
    })
  }

  render() {
    // console.log('this state', this.state);
    // let tweetinesses = [];
    let favoriteList = '';
    let { favorites } = this.state;
    if (favorites) {
      // const { statuses } = this.state.favorites;
      favoriteList = favorites.map((tweet, i) => {
        let { text, id } = tweet;
        return (
          <tr id="cool" key={i}>
            <td>{text}</td>
            <td><button onClick={() => this._unfavorite(id)} className="btn btn-default"><span className="glyphicon glyphicon-star-empty" /></button></td>
            {/* <td>{location.city}, {location.state_code}</td>
            <td><button onClick={() => this._getInfo(id)} className="btn btn-default"><span className="glyphicon glyphicon-info-sign"></span></button></td> */}
          </tr>
        );
      });
    }
    // let statuses = this.state.favorite.tweetiness || [];
    console.log('this.state', this.state);

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
            {favoriteList}
          </tbody>
        </table>
      </div>
    );
  }


  }
