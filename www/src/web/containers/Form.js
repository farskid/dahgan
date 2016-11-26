import React, {Component} from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  setFirstTime,
  setCurrents,
  toggleOffCanvas
}  from '../../actions'

import Header from '../components/Header'
import List from '../components/List'
import ListItem from '../components/ListItem'
import OffCanvas from '../components/OffCanvas'
import Icon from '../components/Icon'
import Alert from '../components/Alert'

class Form extends Component {

  constructor(props) {
    super(props)
    this.setResult = this.setResult.bind(this)
  }

  componentDidMount() {
    this.props.toggleOffCanvas(false)
    this.props.setCurrents(null)
  }

  componentWillUnmount() {
    this.props.setCurrents(null)
  }

  setResult() {
    if (this.refs.input.value.length > 24) {
      alert('عدد وارد شده نا ۲۴ رقم پشتیبانی میشود')
      return
    }
    this.props.setCurrents(this.refs.input.value)
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
        <div className="content" >
          <Alert close={false} type="info">برای اینکه توی آزمون ها بهتر عمل کنی اینجا تمرین کن</Alert>
          <Alert close={false} type="info">برای تمرین کافیه عدد مورد نظر رو توی مکان زیر وارد کنی</Alert>
          <h1 className="result">{this.props.currentChar}</h1>
          <form action="#" onSubmit={(e) => {
            e.preventDefault()
            {/*console.log(this.props)*/}
            this.setResult()
          }}>
            <fieldset>
              <input type="number" className="text-center" ref="input" defaultValue={this.props.currentNum}/>
              <button className="btn btn-block btn-positive">حساب کن</button>
            </fieldset>
          </form>
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {isFirstTime, currentChar, currentNum, offCanvasShown, stars} = state.entities

  return {
    isFirstTime,
    currentChar,
    currentNum,
    offCanvasShown,
    stars
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setFirstTime,
    setCurrents,
    toggleOffCanvas
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

