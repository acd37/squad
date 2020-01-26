import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import NotFound from './pages/NotFound';

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
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   window.location.href = '/';
  // }
}

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <div className="application">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default withRouter(App);
