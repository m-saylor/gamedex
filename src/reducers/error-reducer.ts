import { ActionTypes } from '../actions';

const initialState = {
  error: false,
  msg: '',
};

const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
    case ActionTypes.FETCH_POSTS:
    case ActionTypes.AUTH_USER:
    case ActionTypes.DEAUTH_USER:
      return { error: false, msg: '' };
    case ActionTypes.AUTH_ERROR:
      return { error: true, msg: action.message };
    case ActionTypes.ERROR_SET:
      return { error: true, msg: action.message };
    default:
      return state;
  }
};

export default errorReducer;
