import axios from 'axios';
import { GET_ERRORS, SET_USER_STREAKS, CREATE_MESSAGE } from './types';

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

export const deleteStreak = streakId => dispatch => {
  axios
    .delete(`/api/streak/${streakId}`)
    .then(response => {
      if (response.data.streakDeleted) {
        dispatch(getUserStreaks());
        dispatch({
          type: CREATE_MESSAGE,
          payload: {
            streak: response.data.message
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createStreak = streakData => dispatch => {
  if (streakData.streakType === 'individual') {
    axios
      .post('/api/streak/individual', streakData)
      .then(response => {
        if (response.data.streakCreated) {
          dispatch(getUserStreaks());
          dispatch({
            type: CREATE_MESSAGE,
            payload: {
              streak: response.data.message
            }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  } else if (streakData.streakType === 'squad') {
    axios
      .post('/api/streak/squad', streakData)
      .then(response => {
        if (response.data.streakCreated) {
          dispatch(getUserStreaks());
          dispatch({
            type: CREATE_MESSAGE,
            payload: {
              streak: response.data.message
            }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
