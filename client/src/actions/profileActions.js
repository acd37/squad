import axios from 'axios';
import { GET_ERRORS, SET_USER_PROFILE } from './types';

export const getUserProfile = () => dispatch => {
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
