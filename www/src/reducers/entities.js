import ActionTypes from '../actions/ActionTypes'
import {get} from '../utils/storage'

const initialState = {
  isFirstTime: get('isFirstTime'),
  username: get('username') || 'کوچولو', // User's name
  stars: get('stars') || 0, // The stars user gains
  backgroundSound: true, // Boolean indicating whether background sound be played or paused
  currentNum: null, // Current number inserted into form
  currentChar: null, // Current character converted from state.currentNumber
  audios: [], // Audio array containing a chain of all audio files need to be played for the aid
  message: [], // Messages array to be shown to user
  offCanvasShown: false, // Off Canvas Menu shown state
  testScore: 0, // Score on test
  testQ: 0, // Number of questions tried on test
  testStart: false, // test running state
  testLevel: null, // Level of hardness: 1. Easy 2. Medium 3. Hard
  testMode: null, // Mode of test can be 1. 4 options 2. answer box
  testOptions: null, // An array of 4 options
  testResult: null, // Test Result status holder 'win' || 'loose'
  popup: false, // Helper for test popup
}

export default function entities(state = initialState, action) {

  switch (action.type) {

    /* First Time */
    case ActionTypes.SET_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.meta.isFirstTime
      }

    /* Username */
    case ActionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.meta.username
      }

    /* Currents */
    case ActionTypes.SET_CURRENTS:
      return {
        ...state,
        currentNum: action.meta.num,
        currentChar: action.meta.char
      }

    /* Off Canvas */
    case ActionTypes.TOGGLE_OFF_CANVAS:
      return {
        ...state,
        offCanvasShown: action.meta.shown
      }

    /* Popup Action */
    case ActionTypes.TOGGLE_POPUP:
      return {
        ...state,
        popup: action.meta.popup
      }

    /* TEST */
    case ActionTypes.TOGGLE_TEST:
      return {
        ...state,
        testStart: action.meta.start
      }

    case ActionTypes.SET_TEST:
      return {
        ...state,
        testScore: action.meta.score,
        testQ: action.meta.q
      }

    case ActionTypes.SET_TEST_LEVEL:
      return {
        ...state,
        testLevel: action.meta.level
      }

    case ActionTypes.SET_TEST_MODE:
      return {
        ...state,
        testMode: action.meta.mode
      }

    case ActionTypes.SET_TEST_OPTIONS:
      return {
        ...state,
        testOptions: action.meta.options
      }

    case ActionTypes.SET_TEST_RESULT:
      if (!action.meta.stars) {
        return {
          ...state,
          testResult: action.meta.result
        }
      }
      return {
        ...state,
        testResult: action.meta.result,
        stars: action.meta.stars
      }

    /* Background Sound */
    case ActionTypes.TOGGLE_BACKGROUND_SOUND:
      return {
        ...state,
        backgroundSound: action.meta.bool
      }


    default:
      return state
  }
}
