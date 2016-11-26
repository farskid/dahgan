import * as firstTimeAction from './firstTimeAction'
import * as usernameAction from './usernameAction'
import * as currentsAction from './currentsAction'
import * as offCanvasAction from './offCanvasAction'
import * as popupAction from './popupAction'
import * as testAction from './testAction'
import * as toggleBackgroundSound from './toggleBackgroundSoundAction'

module.exports = {
  ...firstTimeAction,
  ...usernameAction,
  ...currentsAction,
  ...offCanvasAction,
  ...popupAction,
  ...testAction,
  ...toggleBackgroundSound
}
