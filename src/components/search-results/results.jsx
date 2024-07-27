// @ts-nocheck

import React, { useCallback, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import { flatten } from 'lodash';
import ResultsList from './results-list';
import JumpToTop from '../jump-to-top';
import SkeletonList from './skeleton-results-list';
import { getIgdbSearchQueryFn } from '../../api/igdb';
import { addSearchParam } from '../../utils/router-utils';

function Results() {
  // hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');

  // query
  const queryClient = useQueryClient();
  const queryFn = getIgdbSearchQueryFn(searchTerm);
  const {
    data, fetchNextPage, isFetching, hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchResults', searchTerm],
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return pages.length;
    },
  });

  const games = flatten(data?.pages);

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

  if (!games || games.length === 0) {
    return <div className="results-page"><SkeletonList /></div>;
  }

  return (
    <div className="results-page">
      <ResultsList games={games} onSelectGame={onSelectGame} />
      <JumpToTop />
      <Flex justifyContent="center"><Button disabled={!hasNextPage} isLoading={isFetching} mb={16} onClick={() => fetchNextPage()}>Load More</Button></Flex>
    </div>
  );
}

export default Results;
