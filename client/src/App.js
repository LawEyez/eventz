import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Events from './components/events/Events'
import Bookings from './components/bookings/Bookings'
import Navbar from './components/layout/Navbar'
import SideNav from './components/layout/SideNav'

import AuthContext from './context/authContext'

class App extends Component {

  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiry) => {
    this.setState({
      token,
      userId
    })
  }

  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  }

  render () {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <SideNav />
          <div className="App">
            
            <Navbar />

            <Switch>
              {!this.state.token && <Redirect from='/bookings' to='/login' exact />}
              {this.state.token && <Redirect from='/' to='/events' exact />}
              {this.state.token && <Redirect from='/login' to='/events' exact />}
              {!this.state.token && <Route path='/login' component={Login} />}
              {!this.state.token && <Route path='/signup' component={Signup} />}
              <Route path='/events' component={Events} />
              {this.state.token && <Route path='/bookings' component={Bookings} />}
              {!this.state.token && <Redirect to='/login' exact />}
            </Switch>
                  
          </div>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
