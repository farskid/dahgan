import React from 'react'
import Route from 'react-router/lib/Route'
import App from './containers/App'
import Video from './containers/Video'
import Menu from './containers/Menu'
import Form from './containers/Form'
import Test from './containers/Test'

import {IndexRoute} from 'react-router'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Menu} />
    <Route path="/video" component={Video} />
    <Route path="/form" component={Form} />
    <Route path="/test" component={Test} />
  </Route>
)
