import axios from 'axios';
import { GET_ERRORS, SET_USER_SQUAD } from './types';

export const getUserSquad = () => dispatch => {
  axios
    .get('/api/squad')
    .then(res => {
      dispatch({
        type: SET_USER_SQUAD,
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
