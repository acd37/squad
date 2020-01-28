import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  messages: messageReducer,
  errors: errorReducer
});
