import { SET_USER_PROFILE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return (state = action.payload);
    default:
      return state;
  }
}
