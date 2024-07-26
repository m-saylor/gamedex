import { ActionTypes } from '../actions';

const initialState = {
  userInfo: {},
  userGames: [],
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_INFO:
      return { ...state, userInfo: action.payload };
    case ActionTypes.FETCH_USER_GAMES:
      return { ...state, userGames: action.payload };
    default:
      return state;
  }
};

export default userReducer;
