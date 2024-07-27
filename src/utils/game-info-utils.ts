import type { Game as IgdbGame } from "igdb-api-types"

export function getCoverUrl(url: string | undefined, size: string) {
  if (!url) return "";
  const coverUrl = `https:${url}`.replace('thumb', size);
  return coverUrl;
}

export function getFirstReleaseYear(game: IgdbGame, years: { [key: number]: number | undefined }) {
  const firstReleaseDate = game?.release_dates?.[0]

  if (typeof firstReleaseDate === "number") {
    return years[firstReleaseDate];
  }
  
  return undefined;
}
