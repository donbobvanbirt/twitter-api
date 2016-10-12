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
  _unfavorite(id) {
    TwitterActions.unfavorite(id);
  }

  render() {
    let favoriteList = '';
    let { favorites } = this.state;
    if (favorites) {

      favoriteList = favorites.map((tweet, i) => {
        let { text, id } = tweet;
        return (
          <tr id="cool" key={i}>
            <td>{text}</td>
            <td><button onClick={() => this._unfavorite(id)} className="btn btn-default"><span className="glyphicon glyphicon-remove" /></button></td>
          </tr>
        );
      });
    }

    return (
      <div>
        <table className="table">
          <tbody>
            {favoriteList}
          </tbody>
        </table>
      </div>
    );
  }


  }
