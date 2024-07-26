import { ActionTypes } from '../actions';
import { signOutSuccess } from '../utils/text-utils';

const initialState = {
  authenticated: false,
  error: false,
  user: {},
  msg: '',
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        authenticated: true, error: false, msg: action.payload,
      };
    case ActionTypes.DEAUTH_USER:
      return {
        authenticated: false, error: false, user: {}, msg: signOutSuccess,
      };
    case ActionTypes.AUTH_ERROR:
      return {
        authenticated: false,
        error: true,
        user: {},
        msg: action.msg,
      };
    case ActionTypes.CLEAR_AUTH_ERROR:
      return { ...state, error: false, msg: '' };
    default:
      return state;
  }
};

export default authReducer;
