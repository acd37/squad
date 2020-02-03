import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import { logoutUser } from './actions/authActions';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFound from './pages/NotFound';

import Alerts from './alerts/Alerts';
import AlertTemplate from './alerts/AlertTemplate';

// redux
import { setCurrentUser } from './actions/authActions';

// // persistent login
if (localStorage.squad) {
  setAuthToken(localStorage.squad);

  // decode token and get user info
  const decoded = jwtDecode(localStorage.squad);

  // set user and isAuth
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

function App() {
  // Alert Options
  const opts = {
    timeout: 3000,
    position: 'bottom right'
  };

  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...opts}>
          <Router>
            <Alerts />
            <div className="application">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    </div>
  );
}

export default withRouter(App);
