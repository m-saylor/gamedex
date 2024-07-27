export function getCoverUrl(url: string | undefined, size: string) {
  if (!url) return "";
  const coverUrl = `https:${url}`.replace('thumb', size);
  return coverUrl;
}

export function getFirstReleaseYear(game, years) {
  const first = years[game?.release_dates?.[0]];
  return first;
}
