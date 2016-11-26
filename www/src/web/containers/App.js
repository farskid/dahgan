import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Audio from '../components/Audio'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Audio loop={true} pause={!this.props.backgroundSound} source="/android_asset/www/bg.mp3" />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {backgroundSound} = state.entities
  return {
    backgroundSound
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
