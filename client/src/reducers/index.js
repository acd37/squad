import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import streakReducer from './streakReducer';
import squadReducer from './squadReducer';

export default combineReducers({
  auth: authReducer,
  messages: messageReducer,
  errors: errorReducer,
  profile: profileReducer,
  streaks: streakReducer,
  squad: squadReducer
});
