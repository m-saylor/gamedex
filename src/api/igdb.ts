import axios from 'axios';
import { getCoverUrl, getFirstReleaseYear } from '../utils/game-info-utils';

// IGDB URLs
export const IGDB_GAMES_URL = 'https://t4ebtc69jj.execute-api.us-west-2.amazonaws.com/production/v4/games';
export const IGDB_COVERS_URL = 'https://t4ebtc69jj.execute-api.us-west-2.amazonaws.com/production/v4/covers';
export const IGDB_DATES_URL = 'https://t4ebtc69jj.execute-api.us-west-2.amazonaws.com/production/v4/release_dates';

// IGDB API key
const API_KEY = 'jIXQfDYw1yaJmLNLclCnI7fsrufLpmhB3eR8yuKn';

// IGDB API header
export const IGDB_HEADERS = { 'x-api-key': API_KEY };

/**
 * Generic function that sends a query to the IGDB /games endpoint and returns the results
 *
 * @param {string} query - IGDB API query, as described here https://api-docs.igdb.com/#reference
 * @returns an array of IGDB game objects
 */
export async function fetchGames(query) {
  const response = await axios.post(IGDB_GAMES_URL, query, {
    headers: IGDB_HEADERS,
  });
  const games = response.data;
  return games;
}

/**
 * Fetch the game cover url from a cover id.
 * @param {string} coverId
 * @returns formatted cover url
 */
export async function fetchGameCoverUrl(coverId) {
  const query = `fields url; where id=${coverId};`;

  // Fetch cover art for the game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });

  const cover = response.data?.[0];
  const coverUrl = cover ? `https://${cover.url.replace('thumb', 'cover_big')}` : undefined;
  return coverUrl;
}

/**
 * Fetch the release year from a release year id
 * @param {string} releaseYearId
 * @returns release year (YYYY)
 */
export async function fetchGameReleaseYear(releaseYearId) {
  const query = `fields y; where id=${releaseYearId};`;

  const response = await axios.post(IGDB_DATES_URL, query, {
    headers: IGDB_HEADERS,
  });

  return response.data?.[0]?.y;
}

/**
 * Fetches covers from an array of games
 * @returns an object with cover id keys mappign to cover url values
 */
export async function fetchGameCovers(games) {
  // Build cover query
  const coverIds = games.map((game) => {
    return game.cover;
  }).filter(Boolean);

  const query = `fields url; where id=(${coverIds.toString()}); limit 100;`;

  // Fetch cover art for each game
  const response = await axios.post(IGDB_COVERS_URL, query, {
    headers: IGDB_HEADERS,
  });

  const covers = {};
  response.data.forEach((cover) => {
    covers[cover.id] = cover.url;
  });
  return covers;
}

/**
 * Fetches release years from an array of games
 * @returns an object with release year id keys maping to year (YYYY) values
 */
export async function fetchGameReleaseYears(games) {
  const yearIds = games.map((game) => {
    return game.release_dates?.[0] ?? 0;
  });

  const query = `fields y; where id=(${yearIds.toString()}); limit 100;`;

  const response = await axios.post(IGDB_DATES_URL, query, {
    headers: IGDB_HEADERS,
  });

  const years = {};
  response.data.forEach((year) => {
    years[year.id] = year.y;
  });
  return years;
}

/**
 * Fetches game info from IGDB
 *
 * @param {string} query - IGDB API query, as described here https://api-docs.igdb.com/#reference
 * @returns an array of games with info from IGDB,
 * including game name, cover image, and release year
 */
export async function fetchGamesInfoFromIGDB(query) {
  const games = await fetchGames(query);

  // Then, fetch game covers and years for the games
  // Original request only returns IDs for covers and years
  const covers = await fetchGameCovers(games);
  const years = await fetchGameReleaseYears(games);

  const mergedGames = games.map((game) => {
    const coverUrl = getCoverUrl(covers[game.cover], 'cover_big');
    const year = getFirstReleaseYear(game, years);
    return {
      ...game, coverUrl, year, avgRating: game.rating, userRating: undefined,
    };
  });

  return mergedGames;
}

/**
 * Fetches IGDB information for a game from the trending Twitch tab
 *
 * @param {array} twitchGames - an array of the trending Twitch games
 * @returns an object of trending Twitch games with info from IGDB,
 * including game name, cover image, and release year
 */
export async function fetchGameCardsFromTwitchToIGDB(twitchGames) {
  const igdbIds = twitchGames.map((game) => game.igdb_id);
  const query = `fields name, rating, cover, franchise, genres, summary, release_dates; where id=(${igdbIds.toString()}); limit 100;`;

  const games = await fetchGamesInfoFromIGDB(query);

  return games;
}

/**
 * Returns a query function to search for IGDB games
 *
 * @param {array} searchTerm - string to search for
 * @returns an async function with takes in pageParams as a parameter. To be used in React Query useInfiniteQuery
 */
export function getIgdbSearchQueryFn(searchTerm) {
  const queryFn = async ({ pageParam = 0 }) => {
    const offset = pageParam * 10;
    const query = `search "${searchTerm}"; fields name, rating, rating_count, cover, summary, release_dates; where version_parent = null & rating_count > 0; limit 10; offset ${offset};`;
    const games = await fetchGamesInfoFromIGDB(query);
    return games;
  };

  return queryFn;
}

/**
 * Fetches a preview of game name for games based on the search term
 *
 * @param {array} twitchGames - IGDB API query, as described here https://api-docs.igdb.com/#reference
 * @returns an array of IGDB game objects
 */
export async function searchGamesPreviewFromIGDB(searchTerm) {
  const query = `search "${searchTerm}"; fields name, rating, cover, franchise, genres, summary, release_dates; where version_parent = null & rating_count > 0;`;

  const games = fetchGames(query);

  return games;
}

/**
 *
 * Fetches game card fields for a single game, including the cover url and release year
 *
 * @param {*} igdbId - IGDB game id
 * @returns game object
 */
export async function fetchGameCard(igdbId) {
  const query = `fields name, rating, cover, franchise, genres, summary, release_dates; where id=${igdbId};`;

  const games = await fetchGames(query);
  const game = games?.[0];

  const coverUrl = await fetchGameCoverUrl(game.cover);
  const year = await fetchGameReleaseYear(game.release_dates[0]);

  return {
    ...game, coverUrl, year, avgRating: game.rating, userRating: undefined,
  };
}

/**
 *
 * Fetches the list of top 100 rated games from the IGDB API
 *
 * @returns games object
 */
export async function fetchTopRatedGames() {
  const query = 'fields name, rating, cover, franchise, genres, summary, release_dates; sort rating desc; where rating_count > 400 & version_parent = null; limit 100;';

  const gamesData = await fetchGamesInfoFromIGDB(query);

  return gamesData;
}
