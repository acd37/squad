import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import {
  SET_CURRENT_USER,
  GET_ERRORS,
  CREATE_MESSAGE,
  SET_USER_SQUAD,
  SET_USER_STREAKS,
  SET_USER_PROFILE,
  CLEAR_ERRORS
} from './types';

export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      // save token to localStorage
      const { token } = res.data;
      localStorage.setItem('squad', token);

      // set token to auth header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwtDecode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user', userData)
    .then(res => {
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          registration: 'Account was successfully created.'
        }
      });
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// set user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// logout user
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('squad');

  // remove auth header
  setAuthToken(false);

  // set current user to {}
  dispatch(setCurrentUser({}));

  // clear errors
  dispatch({
    type: CLEAR_ERRORS
  });

  // set profile to {}
  dispatch({
    type: SET_USER_PROFILE,
    payload: {}
  });

  // set squad to {}
  dispatch({
    type: SET_USER_SQUAD,
    payload: {}
  });

  // set streaks to []
  dispatch({
    type: SET_USER_STREAKS,
    payload: []
  });
};
