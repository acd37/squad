import axios from 'axios';
import { GET_ERRORS, SET_USER_SQUAD, CREATE_MESSAGE } from './types';

export const getUserSquad = () => dispatch => {
  axios
    .get('/api/squad')
    .then(res => {
      dispatch({
        type: SET_USER_SQUAD,
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

export const updateSquad = squadData => dispatch => {
  axios.put('/api/squad', squadData).then(res => {
    dispatch(getUserSquad());
    dispatch({
      type: CREATE_MESSAGE,
      payload: {
        squad: res.data.message
      }
    });
  });
};

export const createNewSquad = squadName => dispatch => {
  axios
    .post('/api/squad/create', { squadName })
    .then(res => {
      dispatch({
        type: SET_USER_SQUAD,
        payload: res.data
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          squad: res.data.message
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

export const joinSquad = invitationCode => dispatch => {
  axios
    .put('/api/squad/join', { invitationCode })
    .then(res => {
      dispatch({
        type: SET_USER_SQUAD,
        payload: res.data
      });
      dispatch({
        type: CREATE_MESSAGE,
        payload: {
          squad: res.data.message
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

export const getSquadMembers = () => dispatch => {
  // axios.get('/api/')
};
