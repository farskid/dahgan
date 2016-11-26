import React, {Component} from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  setFirstTime,
  toggleOffCanvas,
  toggleBackgroundSound
}  from '../../actions'

import Header from '../components/Header'
import Icon from '../components/Icon'
import Alert from '../components/Alert'
import OffCanvas from '../components/OffCanvas'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Network from '../plugins/Network'

class Video extends Component {

  componentWillMount() {
    this.props.setFirstTime(false)
    this.props.toggleBackgroundSound(false)
  }

  componentWillUnmount() {
    this.props.toggleBackgroundSound(true)
  }


  render() {
    return (
      <div className="page">
        <Header>
          <div className="pull-left">
            <a href="#" className="btn" onClick={(e) => {
              e.preventDefault()
              browserHistory.goBack()
            }}><Icon icon="icon-left-nav" /></a>
          </div>
          <div className="center">
            <span className="star-animated" style={{lineHeight: '49px', color: '#fff'}}>{this.props.stars} <Icon icon="icon-star-filled" /></span>
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
          <Alert type="info" close={false}>دیدن ویدیوی پایین بهت کمک میکنه بیشتر با طرز کار با نرم افزار آشنا بشی</Alert>
          <div className="video">
            <video controls>
              <source src="/android_asset/www/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
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
        {/*<Network />*/}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {isFirstTime, offCanvasShown, stars, backgroundSound} = state.entities

  return {
    isFirstTime,
    offCanvasShown,
    stars,
    backgroundSound
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFirstTime,
    toggleOffCanvas,
    toggleBackgroundSound
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)

