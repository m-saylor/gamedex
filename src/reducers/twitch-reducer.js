import { ActionTypes } from '../actions';

const initialState = {
  trending: [],
};

const twitchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.TWITCH_TRENDING:
      return { ...state, trending: action.payload };
    default:
      return state;
  }
};

export default twitchReducer;
