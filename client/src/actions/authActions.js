import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS, CREATE_MESSAGE } from './types';

export const loginUser = userData => dispatch => {
  console.log(userData);

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
  console.log(userData);

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
  console.log('here');
  // remove token from localStorage
  localStorage.removeItem('squad');

  // remove auth header
  setAuthToken(false);

  // set current user to {}
  dispatch(setCurrentUser({}));
};