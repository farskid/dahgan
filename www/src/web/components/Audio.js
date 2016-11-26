import React, {Component} from 'react'

export default class Audio extends Component {

  constructor(props) {
    super(props)
    this.rand = Math.floor(9999 * Math.random() + 1)
    this.audio = null
  }

  componentDidMount() {
    this.audio = this.refs[`audio-${this.rand}`]

    if (!this.props.pause) {
      console.log('init play...')
      this.audio.play()
    }

    this.audio.addEventListener('ended', () => {
      if (!this.props.pause && this.props.loop) {
        this.audio.currentTime = 0
        this.audio.play()
      }
    })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.pause != this.props.pause
  }

  componentWillUpdate(nextProps) {
    if (nextProps.pause) {
      console.log('pausing...')
      this.audio.pause()
    } else {
      console.log('playing...')
      this.audio.play()
    }
  }

  render() {
    return (
      <audio ref={`audio-${this.rand}`} src={this.props.source} />
    )
  }

}
