import React, { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import ResultsList from './results-list';
import JumpToTop from '../jump-to-top';
import SkeletonList from './skeleton-results-list';
import { searchGamesFromIGDB } from '../../api/igdb';
import { addSearchParam } from '../../utils/router-utils';

function Results() {
  // hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  // query
  const queryClient = useQueryClient();
  const results = useQuery({ queryKey: ['searchResults', searchTerm], queryFn: () => searchGamesFromIGDB(searchTerm), enabled: searchTerm !== undefined });
  const games = results.data;

  useEffect(() => {
    if (!games) return;

    games.forEach((game) => {
      queryClient.setQueryData(['selectedGame', String(game.id)], game);
    });
  }, [queryClient, games]);

  // function for loading the individual game page
  const onSelectGame = useCallback((game) => {
    setSearchParams(addSearchParam('selected', game.id));
  }, [setSearchParams]);

  if (!searchTerm) {
    return <div className="results-page">No results</div>;
  }

  if (!games) {
    return <div className="results-page"><SkeletonList /></div>;
  }

  return (
    <div className="results-page">
      <ResultsList games={games} onSelectGame={onSelectGame} />
      <JumpToTop />
    </div>
  );
}

export default Results;
