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
};

// update game information when clicking the save button
export function updateGame(id: number, navigate, newName: string) {
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
export function deleteGame(id: number, navigate) {
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

export function signinUser({ emailOrUsername, password }) {
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

// deletes token from localstorage and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
  };
}

export function updateUser(username: string, user) {
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
export function updateUserGame(userGames, username: string, game, review: object) {
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

export function fetchUserGames(username: string) {
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
