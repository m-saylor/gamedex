import axios from 'axios';

const TWITCH_CLIENT_ID = 'vdc8zk32y8t1shw13l3upxufjhjdqd';
const TWITCH_CLIENT_SECRET = 'usfmwfr26y8p0opracqci6kkegkw85';

const TWITCH_OAUTH_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_TOP_GAMES_URL = 'https://api.twitch.tv/helix/games/top?first=100';

// Number of trending games to return
const TRENDING_GAMES_LENGTH = 78;

// Exclude Virtual Casino, I'm Only Sleeping, VR Chat, and no covers
const EXCLUDED_GAME_IDS = ['45517', '71001', '33615', '290049'];

function includeGame(game) {
  if (game.igdb_id === '' || game.box_art_url === '') {
    return false;
  }

  if (EXCLUDED_GAME_IDS.findIndex((excludedId) => String(excludedId) === String(game.igdb_id)) !== -1) {
    return false;
  }

  return true;
}

export async function getAccessToken() {
  const response = await axios.post(`${TWITCH_OAUTH_URL}?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`);
  return response.data.access_token;
}

export async function getTrendingGames() {
  const token = localStorage.getItem('twitchToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Client-Id': TWITCH_CLIENT_ID,
  };

  const response = await axios.get(TWITCH_TOP_GAMES_URL, { headers });
  const { cursor } = response.data.pagination;

  // Filter non games
  let games = response.data.data.filter(includeGame);

  // Fetch another page if we don't have enough games
  let newGames = [];
  if (games.length < TRENDING_GAMES_LENGTH) {
    const response2 = await axios.get(`${TWITCH_TOP_GAMES_URL}&after=${cursor}`, { headers });
    newGames = response2.data.data.filter(includeGame);
  }

  // Add new games, slice beyond TRENDING_GAMES_LENGTH
  games = games.concat(newGames).slice(0, TRENDING_GAMES_LENGTH);

  // Fix image urls
  const processedGames = games.map((game) => {
    const imageUrl = game.box_art_url;
    const sizedUrl = imageUrl?.replace('{width}', 1000).replace('{height}', 1300);
    return { ...game, box_art_url: sizedUrl };
  });

  return processedGames;
}
