import ActionTypes from './ActionTypes'
import {get, set} from '../utils/storage'

export function setTest(score, q) {
  return {
    type: ActionTypes.SET_TEST,
    meta: {score, q}
  }
}

export function toggleTest(bool) {
  return {
    type: ActionTypes.TOGGLE_TEST,
    meta: {start: bool}
  }
}

export function setTestLevel(level = 1) {
  return {
    type: ActionTypes.SET_TEST_LEVEL,
    meta: {level}
  }
}

export function setTestMode(mode) {
  return {
    type: ActionTypes.SET_TEST_MODE,
    meta: {mode}
  }
}

export function setTestOptions(options) {
  return {
    type: ActionTypes.SET_TEST_OPTIONS,
    meta: {options}
  }
}

export function setTestResult(result, gainedStars) {

  if (!result || !gainedStars) {
    return {
      type: ActionTypes.SET_TEST_RESULT,
      meta: {result: null}
    }
  }

  let currentStars = get('stars') || 0
  let stars = currentStars + gainedStars
  set('stars', stars)

  return {
    type: ActionTypes.SET_TEST_RESULT,
    meta: {result, stars}
  }
}
