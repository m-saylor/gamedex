export function getCoverUrl(cover: string, size: string) {
  const coverUrl = `https:${cover}`.replace('thumb', size);
  return coverUrl;
}

export function getFirstReleaseYear(game, years) {
  const first = years[game?.release_dates?.[0]];
  return first;
}
