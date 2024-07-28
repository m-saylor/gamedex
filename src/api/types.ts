import type { Game as IgdbGame } from 'igdb-api-types';

export type Game = IgdbGame & {
  coverUrl?: string;
  firstYear?: number;
  avgRating?: number;
  userRating?: number;
}

export type TwitchGame = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
}

export type TwitchGamesResponse = {
  data: TwitchGame[];
  pagination: {
    cursor: string;
  };
}

export type SignInParameters = {
  emailOrUsername: string;
  password: string;
}
