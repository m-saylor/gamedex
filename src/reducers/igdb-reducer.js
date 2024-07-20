import { ActionTypes } from '../actions';

const initialState = {
  resultsPreview: [],
  results: {},
  topRated: {},
  trending: {},
  selectedGame: null,
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_TOP_RATED:
      return {
        ...state, topRated: { games: action.games, covers: action.covers, years: action.years },
      };
    case ActionTypes.SELECT_GAME:
      return {
        ...state, selectedGame: action.payload,
      };
    default:
      return state;
  }
};

export default IGDBReducer;
