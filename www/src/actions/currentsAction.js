import ActiontTypes from './ActionTypes'
import numberToPersian from '../utils/convert'

export function setCurrents(num) {

  let char = num == null ? null : numberToPersian(num)

  return {
    type: ActiontTypes.SET_CURRENTS,
    meta: {num, char}
  }
}
