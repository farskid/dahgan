import React, {Component} from 'react'

import Header from '../components/Header'

export default class Page extends Component {

  render() {
    return (
      <div className="page">
        <Header>
          <div className="pull-left">{this.props.headerLeft}</div>
          <div className="pull-right">{this.props.headerRight}</div>
        </Header>
        <div className="content">
          <div className="content-padded">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
