import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth-reducer';
import errorReducer from './error-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
});

export default rootReducer;
