import { SET_USER_STREAKS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_STREAKS:
      return (state = action.payload);
    default:
      return state;
  }
}
