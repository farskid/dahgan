import React, {Component} from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  setFirstTime,
  toggleOffCanvas,
  setUsername
}  from '../../actions'

import Popup from '../components/Popup'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Header from '../components/Header'
import Icon from '../components/Icon'
import OffCanvas from '../components/OffCanvas'

class Menu extends Component {

  constructor(props) {
    super(props)
    this.closePopup = this.closePopup.bind(this)
  }

  componentWillUnmount() {
    this.props.toggleOffCanvas(false)
  }

  closePopup() {
    this.props.setFirstTime(false)
  }

  render() {
    return (
      <div className="page">
        <Header>
          <div className="pull-left">
            <span className="star-animated" style={{lineHeight: '49px', color: '#fff'}}><Icon icon="icon-star-filled" /> {this.props.stars}</span>
          </div>
          <div className="pull-right">
            <a href="#" onClick={(e) => {
              e.preventDefault()
              this.props.toggleOffCanvas(!this.props.offCanvasShown)
            }} className="btn">
              <Icon icon="icon-bars" />
            </a>
          </div>
        </Header>
        <div className="content">
          <div className="content-padded">
            <List hasActions>
              <ListItem key="practice">
                <Link className="cloud" to="/form">تمرین کن</Link>
              </ListItem>
              <ListItem key="test">
                <Link className="cloud" style={{ borderColor: '#f7c307' }} to="/test">آزمون بده</Link>
              </ListItem>
              <ListItem key="video">
                <Link className="cloud" style={{ borderColor: '#00ff5a' }} to="/video">ویدیو ببین</Link>
              </ListItem>
            </List>
          </div>
        </div>

        <Popup show={this.props.username && this.props.isFirstTime !== false}>
          <span>{this.props.username} عزیز، میخوای برای آموزش کار با نرم افزار یه ویدیوی کوتاه ببینی؟</span>
          <div style={{marginTop: 30}}>
            <Link to="/video" className="btn btn-positive btn-block">بزن بریم</Link>
            <button className="btn btn-block" onClick={this.closePopup}>بیخیال</button>
          </div>
        </Popup>
        <Popup show={!this.props.username}>
          <span>من دهگان هستم، اسم تو چیه؟</span>
          <div style={{marginTop: 30}}>
            <input type="text" ref="username"/>
            <button className="btn btn-positive btn-block" onClick={() => {
              this.props.setUsername(this.refs.username.value)
            }}>باشه</button>
          </div>
        </Popup>
        <OffCanvas show={this.props.offCanvasShown} hide={() => { this.props.toggleOffCanvas(false) }}>
          <List hasActions={false}>
            <ListItem>
              <Link style={{color: '#da0eb7'}} onClick={() => { this.props.toggleOffCanvas(false) }} to="/">منوی اصلی</Link>
            </ListItem>
            <ListItem>
              <Link style={{color: '#4f6fd2'}} onClick={() => { this.props.toggleOffCanvas(false) }} to="/form">تمرین کن</Link>
            </ListItem>
            <ListItem>
              <Link style={{color: '#16A086'}} onClick={() => { this.props.toggleOffCanvas(false) }} to="/test">آزمون بده</Link>
            </ListItem>
            <ListItem>
              <Link onClick={() => { this.props.toggleOffCanvas(false) }} to="/video">ویدیوي آموزشی ببین</Link>
            </ListItem>
          </List>
        </OffCanvas>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {isFirstTime, offCanvasShown, username, stars} = state.entities

  return {
    isFirstTime,
    offCanvasShown,
    username,
    stars
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFirstTime,
    toggleOffCanvas,
    setUsername
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

