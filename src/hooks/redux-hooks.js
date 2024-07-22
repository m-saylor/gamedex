import { useSelector } from 'react-redux';

/**
 * Function will check whether or not a user is signed in
 * @returns a boolean value which indicates true if authenticated
 */
export function useAuthenticated() {
  return useSelector((reduxState) => reduxState.auth.authenticated);
}

/**
 * Function will check whether or not there is an authentication error
 * @returns the error message or undefined
 */
export function useAuthError() {
  return useSelector((reduxState) => {
    if (reduxState.auth.error) {
      return reduxState.auth.msg;
    }
    return undefined;
  });
}

/**
 * @returns the authentication message
 */
export function useAuthMsg() {
  return useSelector((reduxState) => {
    return reduxState.auth.msg;
  });
}

/**
 * @returns an object with data for the user
 */
export function useUserInfo() {
  return useSelector((reduxState) => reduxState.user?.userInfo);
}

/**
 * @returns an object with saved game data for the user
 */
export function useUserGames() {
  return useSelector((reduxState) => reduxState.user?.userGames);
}
