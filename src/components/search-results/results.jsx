import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { selectGame } from '../../actions';
import ResultsList from './results-list';
import JumpToTop from '../jump-to-top';
// import { useSearchResults } from '../../hooks/redux-hooks';
import SkeletonList from './skeleton-results-list';
import { searchGamesFromIGDB } from '../../api/igdb';

function Results({ searchTerm }) {
  // hooks
  // const results = useSearchResults();
  const dispatch = useDispatch();

  // replace useSearchResults hook?
  // export function useSearchResults() {
  //   return useSelector((reduxState) => reduxState.igdb?.results);
  // }

  const results = useQuery({ queryKey: ['searchResults', searchTerm], queryFn: () => searchGamesFromIGDB(searchTerm), enabled: searchTerm !== undefined });

  // function for loading the individual game page
  const onSelectGame = useCallback((game, coverUrl, year, avgRating) => {
    dispatch(selectGame(game, coverUrl, year, avgRating));
  }, [dispatch]);

  if (!results) {
    return <div className="results-page"><SkeletonList /></div>;
  }

  return (
    <div className="results-page">
      <ResultsList gamesData={results} onSelectGame={onSelectGame} />
      <JumpToTop />
    </div>
  );
}

export default Results;
