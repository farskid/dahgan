import React, {Component} from 'react'
import {Router, Route, Link, browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  togglePopup,
  toggleOffCanvas,
  setCurrents,
  setTest,
  setTestLevel,
  toggleTest,
  setTestMode,
  setTestOptions,
  setTestResult
}  from '../../actions'

import Popup from '../components/Popup'
import Alert from '../components/Alert'
import Header from '../components/Header'
import List from '../components/List'
import ListItem from '../components/ListItem'
import Icon from '../components/Icon'
import OffCanvas from '../components/OffCanvas'
import Counter from '../components/Counter'
import Audio from '../components/Audio'

import numberToPersian from '../../utils/convert'

class Test extends Component {

  constructor(props) {
    super(props)
    this.levelsMap = {
      1: 'ساده',
      2: 'متوسط',
      3: 'سخت'
    }
    this.chosenOption = null
    this.generateNumber = this.generateNumber.bind(this)
    this.setTestLevel = this.setTestLevel.bind(this)
    this.start = this.start.bind(this)
    this.answer = this.answer.bind(this)
    this.skip = this.skip.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.finish = this.finish.bind(this)
    this.reset = this.reset.bind(this)
    this.calculateStars = this.calculateStars.bind(this)
  }

  componentDidMount() {
    this.props.togglePopup(true)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.testMode && nextProps.testLevel && (nextProps.testLevel != this.props.testLevel)) {
      console.log('Starting...', nextProps.testLevel, this.props.testLevel)
      this.start(nextProps)
    }
  }

  componentWillUnmount() {
    this.reset()
  }

  reset() {
    this.props.setCurrents(null)
    this.props.setTest(0, 0)
    this.props.toggleTest(false)
    this.props.setTestLevel(null)
    this.props.setTestMode(null)
    this.props.setTestResult(null, null)
  }

  generateNumber(props) {
    let base
    let randomNum

    if (props.testLevel == 1) {
      base = 9999
    } else if (props.testLevel == 2) {
      base = 99999999
    } else if (props.testLevel) {
      base = 999999999999
    }

    randomNum = Math.floor(base * Math.random() + 1)

    if (props.testMode == 1) {
      let options = new Array(3)

      options[0] = Math.floor(base * Math.random() + 1)
      options[1] = Math.floor(base * Math.random() + 1)
      options[2] = Math.floor(base * Math.random() + 1)
      options[3] = randomNum

      options = options.sort(() => Math.random() < 0.5)

      props.setTestOptions(options)
    }

    props.setCurrents(randomNum)
    console.log('generate')
  }

  setTestLevel(level) {
    this.props.setTestLevel(level)
    console.log('Set test level')
  }

  start(props) {
    props.togglePopup(false)
    this.generateNumber(props)
    props.toggleTest(true)
    console.log('Start')
  }

  calculateStars(testScore, testLevel) {
    let levelRatio = [1,3,5][testLevel - 1]
    console.log(`calculated stars: score ${testScore} and level ${testLevel} and stars ${testScore * levelRatio}`)
    return testScore * levelRatio
  }

  answer() {

    if (this.props.testMode == 1) {
      if (this.props.currentChar == numberToPersian(this.chosenOption)) {
        this.props.setTest(this.props.testScore + 1, this.props.testQ + 1)
      } else {
        this.props.setTest(this.props.testScore, this.props.testQ + 1)
      }
      this.chosenOption = null
    }
    else if (this.props.testMode == 2) {
      if (this.props.currentChar == this.refs.input.value.trim()) {
        this.props.setTest(this.props.testScore + 1, this.props.testQ + 1)
      } else {
        this.props.setTest(this.props.testScore, this.props.testQ + 1)
      }
    }

    this.nextQuestion()
    console.log('Answer')
  }

  skip() {
    this.props.setTest(this.props.testScore, this.props.testQ + 1)
    this.nextQuestion()
  }

  nextQuestion() {
    this.generateNumber(this.props)
    if (this.props.testMode == 2) {
      this.refs.input.value = null
    }
    console.log('next Question')
  }

  finish() {
    this.props.setTestResult()
    this.props.toggleTest(false)
    console.log('finish')
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

            <span className="score">
              <span className="en" style={{color: 'green', display: 'inline-block'}}>{this.props.testScore}</span>
               /
              <span className="en" style={{color: 'red', display: 'inline-block'}}>{this.props.testQ - this.props.testScore}</span>
               /
              <span className="en" style={{display: 'inline-block'}}>{this.props.testQ}</span>
            </span>

            ({ this.props.testStart ? <Counter label="ثانیه" /> : <span>0</span> })

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
            <Alert close={false} type="info">بازی در سطح <em> ({this.levelsMap[this.props.testLevel]}) </em></Alert>
            <h1 className="result animated">{this.props.currentNum}</h1>

            {
              this.props.testMode == 1 ?
                <form action="#" onSubmit={(e) => {
                  e.preventDefault()
                }}>
                  <List>
                    {
                      this.props.testOptions && this.props.testOptions.map((opt) => {
                        return <li key={opt} onClick={() => { this.chosenOption = opt; this.answer() }} className="btn btn-block btn-long">{numberToPersian(opt)}</li>
                      })
                    }
                  </List>
                  <button type="button" className="btn btn-block btn-negative" onClick={this.skip}>نمیدونم</button>
                  <div style={{marginTop: 10}}>
                    <button type="button" onClick={this.finish} className="btn btn-block btn-dark">پایان آزمون</button>
                  </div>
                </form>
                :
                <form action="#" onSubmit={(e) => {
                  e.preventDefault()
                  this.answer()
                }}>
                  <fieldset>
                    <textarea style={{ height: 100, resize: 'none' }} className="text-center" ref="input" defaultValue={this.props.currentChar}/>
                    <div className="btn-group">
                      <button type="button" className="btn btn-negative" onClick={this.skip}>نمیدونم</button>
                      <button type="submit" className="btn">جواب بده</button>
                    </div>
                    <div style={{marginTop: 20}}>
                      <button type="button" onClick={this.finish} className="btn btn-block btn-dark">پایان آزمون</button>
                    </div>
                  </fieldset>
                </form>
            }

          </div>
        </div>
        <Popup show={!this.props.testMode}>
          لطفا نوع بازی رو انتخاب کن
          <List hasActions={false}>
            <ListItem className="btn btn-block btn-positive" onClick={() => {this.props.setTestMode(1)}}>چهار گزینه ای</ListItem>
            <ListItem className="btn btn-block btn-positive" onClick={() => {this.props.setTestMode(2)}}>تشریحی</ListItem>
            <ListItem className="btn btn-block" onClick={() => { browserHistory.goBack() }}>خروج</ListItem>
          </List>
        </Popup>
        <Popup show={this.props.testMode && !this.props.testLevel}>
          لطفا سطح آزمون رو انتخاب کن
          <List hasActions={false}>
            <ListItem className="btn btn-block btn-positive" onClick={() => {this.setTestLevel(1)}}>ساده <em>(تا ۴ رقم)</em></ListItem>
            <ListItem className="btn btn-block btn-positive" onClick={() => {this.setTestLevel(2)}}>متوسط <em>(تا ۸ رقم)</em></ListItem>
            <ListItem className="btn btn-block btn-positive" onClick={() => {this.setTestLevel(3)}}>سخت <em>(تا ۱۲ رقم)</em></ListItem>
            <ListItem className="btn btn-block" onClick={() => { browserHistory.goBack() }}>خروج</ListItem>
          </List>
        </Popup>
        <Popup show={this.props.testMode && this.props.testLevel && !this.props.testStart && !this.props.testResult}>
          <h4 style={{ color: '#666', marginTop: 10 }}>{this.props.testScore > this.props.testQ - this.props.testScore ? 'تو بردی' : 'دوباره تلاش کن'}</h4>
          <div style={{marginBottom: 10, color: 'green'}}>صحیح : {this.props.testScore}</div>
          <div style={{marginBottom: 10, color: 'red'}}>غلط : {this.props.testQ - this.props.testScore}</div>
          <div style={{marginBottom: 10}}>کل سوال : {this.props.testQ}</div>

          {
            this.props.testScore <= this.props.testQ - this.props.testScore ?
              <span>
                <div style={{marginBottom: 10}} className="btn btn-block btn-positive" onClick={this.reset}>دوباره</div>
                <Link to="/" className="btn btn-block">خروج</Link>
              </span>
              :
              <div className="btn btn-block btn-positive" onClick={() => {
                this.props.setTestResult(this.props.testScore > this.props.testQ - this.props.testScore ? 'win' : 'loose', this.calculateStars(this.props.testScore, this.props.testLevel))
              }}>باشه</div>
          }
          <Audio pause={!this.props.testMode || !this.props.testLevel || this.props.testStart} loop={false} source={this.props.testScore > this.props.testQ - this.props.testScore ? "/android_asset/www/win.mp3" : "/android_asset/www/loose.mp3"} />
        </Popup>
        <Popup show={this.props.testMode && this.props.testLevel && !this.props.testStart && this.props.testResult}>
          {
            this.props.testScore > this.props.testQ - this.props.testScore ?
              <h3>
                تبریک میگم {this.props.username} تو <span style={{color: '#f7c307', textDecoration: 'underline'}}>{this.calculateStars(this.props.testScore, this.props.testLevel)}</span> ستاره بردی
                <div className="en star-animated" style={{lineHeight: '49px', color: '#fff'}}>{this.props.stars} <Icon icon="icon-star-filled" /></div>
                <div style={{marginBottom: 10}} className="btn btn-block btn-positive" onClick={this.reset}>دوباره</div>
                <Link to="/" className="btn btn-block">خروج</Link>
                <Audio loop={false} source={"/android_asset/www/win.mp3"} />
              </h3>
              :
              ''
          }
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
  const {popup, offCanvasShown, username, currentNum, currentChar, testScore, testQ, testStart, testLevel, testMode, testOptions, testResult} = state.entities

  return {
    popup,
    offCanvasShown,
    currentNum,
    currentChar,
    testScore,
    testQ,
    testStart,
    testLevel,
    testMode,
    testOptions,
    testResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    togglePopup,
    toggleOffCanvas,
    setCurrents,
    setTest,
    setTestLevel,
    toggleTest,
    setTestMode,
    setTestOptions,
    setTestResult
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)

