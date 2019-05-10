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

import Home from './pages/home/index'
import City from './pages/city/index'
import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import Line from './pages/echarts/line/index'
import Bar from './pages/echarts/bar/index'
import Pie from './pages/echarts/pie/index'
import Rich from './pages/rich/index'
import Permission from './pages/permission/index'
import BikeMap from './pages/map/bikeMap'

import Common from './Common'

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/common" render={() =>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            }
            />
            <Route path='/' render={() =>
              <Admin>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path='/city' component={City}/>
                  <Route path='/order' component={Order}/>
                  <Route path='/user' component={User}/>
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

                  <Route path='/charts/line' component={Line}/>
                  <Route path='/charts/bar' component={Bar}/>
                  <Route path='/charts/pie' component={Pie}/>
                  <Route path='/rich' component={Rich}/>
                  <Route path='/permission' component={Permission}/>
                  <Route path='/bikeMap' component={BikeMap}/>

                  <Route component={NoMatch}/>
                </Switch>
              </Admin>
            }/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}