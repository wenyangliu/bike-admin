import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Login from './pages/login'
import NoMatch from './pages/noMatch'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
          <App>
            <Route path='/' render={() =>
              <Admin>
                <Switch>
                  <Route path='/ui/buttons' component={Buttons}/>
                  <Route path='/ui/modals' component={Modals}/>
                  <Route path='/ui/loadings' component={Loadings}/>
                  <Route path='/ui/notification' component={Notification}/>
                  <Route path='/ui/messages' component={Messages}/>
                  <Route path='/ui/tabs' component={Tabs}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            }/>
            <Route path='/login' component={Login}/>
          </App>
      </HashRouter>
    )
  }
}