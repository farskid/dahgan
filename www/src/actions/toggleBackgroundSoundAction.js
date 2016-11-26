import ActiontTypes from './ActionTypes'

export function toggleBackgroundSound(bool) {
  return {
    type: ActiontTypes.TOGGLE_BACKGROUND_SOUND,
    meta: {bool}
  }
}
