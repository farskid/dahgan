import ActiontTypes from './ActionTypes'
import {get, set} from '../utils/storage'

export function setUsername(username) {

  set('username', username)

  return {
    type: ActiontTypes.SET_USERNAME,
    meta: {username}
  }
}

export function setScore(score) {
  set('score', parseFloat(get('score')) + score)

  return {
    type: ActiontTypes.SET_SCORE,
    meta: {score}
  }
}
