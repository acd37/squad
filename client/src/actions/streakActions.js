import axios from 'axios';
import { GET_ERRORS, SET_USER_STREAKS } from './types';

export const getUserStreaks = () => dispatch => {
  axios
    .get('/api/streak')
    .then(res => {
      dispatch({
        type: SET_USER_STREAKS,
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
