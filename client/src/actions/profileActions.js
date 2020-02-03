import axios from 'axios';
import { GET_ERRORS, SET_USER_PROFILE, CREATE_MESSAGE } from './types';
import history from '../utils/history';

export const updatePassword = passwordInformation => dispatch => {
  axios
    .put('/api/profile/password', { passwordInformation })
    .then(res => {
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          registration: 'Password was successfully updated.'
        }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateUserProfile = profileInformation => dispatch => {
  axios
    .put('/api/profile', profileInformation)
    .then(res => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          registration: 'Account was successfully updated.'
        }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserProfile = () => dispatch => {
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data ? res.data : {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createUserProfile = profileInformation => dispatch => {
  axios
    .post('/api/profile', profileInformation)
    .then(res => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data ? res.data : {}
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          registration: 'Profile was successfully created.'
        }
      });
      history.push('/dashboard/profile');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
