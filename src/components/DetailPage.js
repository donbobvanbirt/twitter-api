
import React, { Component } from 'react'
import { Link } from 'react-router'

import TwitterActions from '../actions/TwitterActions'
import TwitterStore from '../stores/TwitterStore'

export default class DetailPage extends Component {
  constructor() {
    super();
    this.state = {
      business: TwitterStore.getInfo()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    let { id } = this.props.params;
    // console.log('id in detail page:', id);
    TwitterActions.getInfo(id);
    TwitterStore.startListening(this._onChange);
    // DetailStore.startListening(this._onChange);
  }

  componentWillUnmount(){
    TwitterStore.stopListening(this._onChange);
  }

  _onChange(){
    this.setState({
      business: TwitterStore.getInfo()
    })
  }

  render() {
    let name, phone, city, state, zip, rating, categories, snippet, img, rateImg = '';
    console.log('this.state', this.state)
    let { business } = this.state;
    if(business) {
      name = business.name;
      phone = business.display_phone;
      city = business.location.city;
      state = business.location.state_code;
      zip = business.location.postal_code;
      rating = business.rating;
      snippet = business.snippet_text;
      img = business.image_url;
      rateImg = business.rating_img_url;
      categories = '';

      business.categories.forEach(category => {
        categories += category;
      })

    }
    return (
      <div>
        <h3 className="text-center">{name}</h3>
        <h4 className="text-center">{city}, {state} {zip}</h4>
        <img className="img-responsive center-block" src={img} alt={name}/><br/>
        <img className="img-responsive center-block" src={rateImg} alt="rating"/>
        <ul className="list-group">
          <li className="list-group-item">Phone Number: {phone}</li>
          <li className="list-group-item">City: {city}</li>
          <li className="list-group-item">State: {state}</li>
          <li className="list-group-item">Zip: {zip}</li>
          <li className="list-group-item">Rating: {rating}</li>
          <li className="list-group-item">Categories: {categories}</li>
          <li className="list-group-item">{snippet}</li>
        </ul>
      </div>
    )
  }
}
