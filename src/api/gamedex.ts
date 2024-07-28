import axios from 'axios';
import { Game } from './types.ts';

// API url
export const GAMEDEX_URL = 'https://video-game-tracker-api.onrender.com/api';

/**
 * Sign in user
 * @param {object} fields - username or email, password
 * @returns token and user data if successful
 */
export async function signIn(fields: object) {
  const response = await axios.post(`${GAMEDEX_URL}/signin`, fields);
  localStorage.setItem('token', response.data.token);

  return { token: response.data.token, user: response.data.user };
}

/**
 * Sign up user
 * @param {object} fields - username, email, password
 * @returns token if successful
 */
export async function signUp(fields: object) {
  const response = await axios.post(`${GAMEDEX_URL}/signup`, fields);
  const { token, user } = response.data;
  return { token, user };
}

/**
 * Check if username is taken
 * @param {string} username
 * @returns true if username is taken, false if not
 */
export async function fetchUser(username: string) {
  try {
    const response = await axios.get(`${GAMEDEX_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * Update user
 * @param {*} user -> new user object
 * @returns updated user
 */
export async function updateUser(username: string, user: object) {
  const fields = { user };
  const response = await axios.put(`${GAMEDEX_URL}/users/${username}`, fields, { headers: { authorization: localStorage.getItem('token') } });
  return response.data;
}

/**
 * Save a game to a user's logged games
 * @param {string} username
 * @param {object} game
 * @param {object} review
 * @returns game if game is successfuly saved, else throw error
 */
export async function saveGame(username: string, game: Game, review?: object | number) {
  const fields = { username, game, review };

  const response = await axios.post(`${GAMEDEX_URL}/users/${username}/games`, fields, { headers: { authorization: localStorage.getItem('token') } });
  return response.data;
}

/**
 * Check local storage for user token, fetch user if token is stored
 * @returns user if token is in local storage, otherwise undefined
 */
export async function loadUser() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  const response = await axios.get(`${GAMEDEX_URL}/users`, { headers: { authorization: token } });
  return response.data.user;
}

/**
 * Fetches a user's saved game
 * @param {string} username
 * @returns array of user's games
 */
export async function getUserGames(username: string) {
  const response = await axios.get(`${GAMEDEX_URL}/users/${username}/games`);
  return Array.from(response.data);
}

/**
 * Delete a game from a user's logged games
 * @param {string} username
 * @param {number} game ID
 * @returns user object if game is successfuly deleted, else throw error
 */
export async function deleteGame(username: string, gameId: number) {
  const response = await axios.delete(`${GAMEDEX_URL}/users/${username}/games`, { headers: { authorization: localStorage.getItem('token') }, data: { gameId } });
  return response.data;
}

/**
 * Update a game from a user's logged games
 * @param {string} username
 * @param {object} game
 * @param {object} review
 * @returns game if game is successfuly saved, else throw error
 */
export async function updateGame(username: string, game: Game, review?: object | number | undefined) {
  const fields = { username, game, review };

  const response = await axios.put(`${GAMEDEX_URL}/users/${username}/games`, fields, { headers: { authorization: localStorage.getItem('token') } });
  return response.data;
}
