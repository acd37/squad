import { SET_USER_SQUAD } from '../actions/types';

const initialState = {
  squadProfiles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_SQUAD:
      return (state = action.payload);
    default:
      return state;
  }
}
