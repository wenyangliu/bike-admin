import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import Login from './pages/login'
import NoMatch from './pages/noMatch'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notification from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import TableBasic from './pages/table/basic'
import TableHigh from './pages/table/high'

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
                  <Route path='/ui/gallery' component={Gallery}/>
                  <Route path='/ui/carousel' component={Carousel}/>
                  <Route path='/form/login' component={FormLogin}/>
                  <Route path='/form/reg' component={FormRegister}/>
                  <Route path='/table/basic' component={TableBasic}/>
                  <Route path='/table/high' component={TableHigh}/>

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