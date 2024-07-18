import * as IGDB from '../api/igdb';
import { signInSuccess, signUpSuccess } from '../utils/text-utils';
import * as GameDex from '../api/gamedex';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USER_INFO: 'FETCH_USER_INFO',
  FETCH_USER_GAMES: 'FETCH_USER_GAMES',
  ERROR_SET: 'ERROR_SET',

  // Auth Actions
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  CLEAR_AUTH_ERROR: 'CLEAR_AUTH_ERROR',

  // IGDB Actions
  IGDB_SEARCH_PREVIEW: 'IGDB_SEARCH_PREVIEW',
  IGDB_SEARCH: 'IGDB_SEARCH',
  IGDB_TOP_RATED: 'IGDB_TOP_RATED',
  IGDB_TRENDING: 'IGDB_TRENDING',

  SELECT_GAME: 'SELECT_GAME',
  CLEAR_SELECTED_GAME: 'CLEAR_SELECTED_GAME',

};

// update game information when clicking the save button
export function updateGame(id, navigate, newName) {
  return async (dispatch) => {
    try {
      const fields = {
        name: newName, rating: '', content: '', coverUrl: '', tags: '',
      };
      const game = await GameDex.updateGame(fields);
      dispatch({ type: ActionTypes.FETCH_POST, payload: game });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// delete an individual game when clicking the delete button
export function deleteGame(id, navigate) {
  return async (dispatch) => {
    try {
      await GameDex.deleteGame(id);
      navigate('/');
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await GameDex.loadUser();
      console.log(user);
      if (user) {
        const games = await GameDex.getUserGames(user.username);
        dispatch({ type: ActionTypes.AUTH_USER, payload: undefined });
        dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
        dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: games });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    msg: error,
  };
}

export function clearAuthError() {
  return {
    type: ActionTypes.CLEAR_AUTH_ERROR,
  };
}

export function signinUser({ emailOrUsername, password }, navigate) {
  // takes in an object with emailOrUsername and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const fields = {
        emailOrUsername, password,
      };
      const { token, user } = await GameDex.signin(fields);
      const games = await GameDex.getUserGames(user.username);
      dispatch({ type: ActionTypes.AUTH_USER, payload: signInSuccess });
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: games });

      localStorage.setItem('token', token);
    } catch (error) {
      dispatch(authError(error.response.data));
    }
  };
}

export function signupUser({ username, email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const fields = {
        username, email, password,
      };
      const { token, user } = await GameDex.signup(fields);
      localStorage.setItem('token', token);
      dispatch({ type: ActionTypes.AUTH_USER, payload: signUpSuccess });
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
    } catch (error) {
      dispatch(authError(error.response.data.error));
    }
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
  };
}

export function updateUser(username, user) {
  return async (dispatch) => {
    try {
      const newUser = await GameDex.updateUser(username, user);
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: newUser });
      return newUser;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };
}

// Add new game
// Update user games and user info
export function addUserGame(userGames, username, game, review) {
  return async (dispatch) => {
    try {
      const { user, newGame } = await GameDex.saveGame(username, game, review);
      const newGames = [...userGames, newGame];
      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: newGames });
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// Delete game from saved games
// Update user games and user info
export function deleteUserGame(userGames, username, gameId) {
  return async (dispatch) => {
    try {
      const user = await GameDex.deleteGame(username, gameId);
      const newGames = [...userGames];
      const deletedGameIdx = newGames.findIndex((game) => String(game.id) === String(gameId));
      newGames.splice(deletedGameIdx, 1);
      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: newGames });
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

// Update game from saved games
// Update user games and user info
export function updateUserGame(userGames, username, game, review) {
  return async (dispatch) => {
    try {
      const user = await GameDex.updateGame(username, game, review);
      const newGames = [...userGames];
      const gameIdx = newGames.findIndex((savedGame) => String(game.id) === String(savedGame.id));
      newGames[gameIdx] = game;
      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: newGames });
      dispatch({ type: ActionTypes.FETCH_USER_INFO, payload: user });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR_SET, message: error });
    }
  };
}

export function fetchUserGames(username) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument
  return async (dispatch) => {
    try {
      const games = await GameDex.getUserGames(username);

      dispatch({ type: ActionTypes.FETCH_USER_GAMES, payload: games });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    }
  };
}

// Search games preview = quick results for the search bar dropdown
export function searchGamesPreview(searchTerm) {
  return (dispatch) => {
    const query = `search "${searchTerm}"; fields name, rating, cover, franchise, genres, summary, release_dates; where version_parent = null & rating_count > 0;`;

    IGDB.fetchGames(query).then((games) => {
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({ type: ActionTypes.IGDB_SEARCH_PREVIEW, payload: games });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

// Search games = full results for the results page
export function searchGames(searchTerm) {
  return async (dispatch) => {
    // query
    const query = `search "${searchTerm}"; fields name, rating, rating_count, cover, franchise, genres, summary, release_dates; where version_parent = null & rating_count > 0;`;

    try {
    // First, request games for the given search term
      const games = await IGDB.fetchGames(query);

      // Then, fetch game covers and years for the games
      // Original request only returns IDs for covers and years
      const covers = await IGDB.fetchGameCovers(games);
      const years = await IGDB.fetchGameReleaseYears(games);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({
        type: ActionTypes.IGDB_SEARCH, payload: { games, covers, years },
      });
    } catch (error) {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    }
  };
}

// IGDB TOP RATED GAMES ACTION
export function fetchTopRatedGames() {
  return (dispatch) => {
    const query = 'fields name, rating, cover, franchise, genres, summary, release_dates; sort rating desc; where rating_count > 400 & version_parent = null; limit 100;';

    IGDB.fetchGames(query).then(async (games) => {
      const covers = await IGDB.fetchGameCovers(games);
      const years = await IGDB.fetchGameReleaseYears(games);
      // dispatch a new action type, which will put the search results into the Redux store
      dispatch({
        type: ActionTypes.IGDB_TOP_RATED, games, covers, years,
      });
    }).catch((error) => {
      // For now, if we get an error, just log it.
      // Add error handling later
      console.log('error', error);
    });
  };
}

export function selectGame(game, coverUrl, year, avgRating, userRating = undefined) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SELECT_GAME,
      payload: {
        ...game, coverUrl, year, avgRating, userRating,
      },
    });
  };
}

export function selectGameAndLoadData(game) {
  return async (dispatch) => {
    try {
      const coverUrl = await IGDB.fetchGameCoverUrl(game.cover);
      const year = await IGDB.fetchGameReleaseYear(game.release_dates[0]);

      dispatch({
        type: ActionTypes.SELECT_GAME,
        payload: {
          ...game, coverUrl, year, avgRating: game.rating, userRating: undefined,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearSelectedGame() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_SELECTED_GAME });
  };
}

export function clearSearchResults() {
  return {
    type: ActionTypes.IGDB_SEARCH,
    payload: null,
  };
}
