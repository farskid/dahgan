import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import hashHistory from 'react-router/lib/hashHistory'
import syncHistoryWithStore from 'react-router-redux/lib/sync'
import Root from './src/web/containers/Root'
import configureStore from './src/store/configureStore'

import './src/assets/css/ratchet.min.css'
import './src/assets/css/ratchet-theme-android.min.css'
import './src/assets/css/app.css'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
