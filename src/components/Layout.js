import React, { Component } from 'react'

import { Link } from 'react-router'
import classNames from 'classnames'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    let path = this.props.location.pathname;

    return (
      <div className='container'>
        <ul className="nav nav-tabs">
          <li role="presentation" className={classNames({active: path === '/'})}><Link to ='/'>Search</Link></li>

          <li role="presentation" className={classNames({active: path === '/test'})}><Link to ='/favorites'>Favorites</Link></li>
        </ul>

        <div className='center'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
