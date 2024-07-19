/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import {
  Grid, GridItem, Image, Skeleton,
} from '@chakra-ui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getSpan, TILE_INDEX_TO_GAME_INDEX } from '../../../utils/masonry-utils';
import { getTrendingGames } from '../../../api/twitch';
import { fetchGameCard } from '../../../api/igdb';

function getGameStyles(gameIdx, hoveredIdx, modalOpen) {
  if (modalOpen) {
    return {
      className: 'blue-gray-filter',
      zIndex: 0,
      filter: 'blur(2px) grayscale(100%)',
    };
  }

  if (hoveredIdx === null) return null;

  if (hoveredIdx === gameIdx) {
    return {
      transform: 'scale(1.08)',
      saturate: '20%',
      zIndex: 20,
    };
  }

  return {
    zIndex: 0,
  };
}

function TrendingGames() {
  // queries
  const trendingTwitch = useQuery({ queryKey: ['trendingTwitchResults'], queryFn: getTrendingGames });
  const twitchData = trendingTwitch?.data;
  const igdbIds = twitchData?.map((game) => game.igdb_id);

  useQueries({
    queries: igdbIds ? igdbIds.map((igdbId) => {
      return { queryKey: ['selectedGame', igdbId], queryFn: () => fetchGameCard(igdbId) };
    }) : [],
  });

  // const trendingIGDB = useQuery({ queryKey: ['trendingIGDBResults', twitchData], queryFn: () => fetchGameInfoFromTwitchToIGDB(twitchData), enabled: twitchData !== undefined });
  // const igdbData = trendingIGDB?.data;
  // const games = igdbData?.games;
  // const covers = igdbData?.covers;
  // const years = igdbData?.years;

  // hooks
  // const dispatch = useDispatch();
  const hoverTimeoutRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGame = searchParams.get('selected');

  // state
  const [hoveredGameIdx, setHoveredGameIdx] = useState(null);

  const onMouseEnterGridItem = useCallback((gameIdx) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredGameIdx(gameIdx);
    }, 10);
  }, []);

  const onMouseLeaveGridItem = useCallback(() => {
    setHoveredGameIdx(null);
    clearTimeout(hoverTimeoutRef);
  }, []);

  const onSelectGame = useCallback((twitchGame) => {
    setSearchParams({ selected: twitchGame.igdb_id });
    // const igdbGame = games.find((game) => String(game.id) === String(twitchGame.igdb_id));
    // if (!igdbGame) { return; }

    // const igdbCover = `https:${covers?.[igdbGame?.cover]}`.replace('thumb', 'cover_big');
    // const igdbYear = years[years?.[0]];
    // const igdbRating = igdbGame.rating;

    // dispatch(selectGame(igdbGame, igdbCover, igdbYear, igdbRating));
  }, [setSearchParams]);

  function renderTrendingGames() {
    const renderedGames = [];

    for (let idx = 0; idx < 78; idx += 1) {
      const span = getSpan(idx);
      const gameIdx = TILE_INDEX_TO_GAME_INDEX[idx];
      const game = twitchData?.[gameIdx];
      const gameStyles = getGameStyles(gameIdx, hoveredGameIdx, selectedGame);
      const isLoading = !game || trendingTwitch.isLoading;

      if (game) {
        renderedGames.push(
          <GridItem
            colSpan={span}
            key={`${game.igdb_id}-${idx}`}
            rowSpan={span}
            onClick={() => onSelectGame(game)}
            onMouseEnter={() => onMouseEnterGridItem(gameIdx)}
            onMouseLeave={onMouseLeaveGridItem}
          >
            {(!isLoading) ? (
              <Image
                {...gameStyles}
                _hover={{
                  cursor: 'pointer',
                }}
                alignItems="center"
                alt="game cover photo"
                borderStyle="solid"
                borderWidth={3}
                cursor="pointer"
                objectFit="cover"
                position="relative"
                src={game.box_art_url}
                transition="filter 0.2s"
              />
            ) : <Skeleton h="100%" minH="200px" w="100%" />}
          </GridItem>,
        );
      }
    }

    return renderedGames;
  }

  return (
    <Grid gap={2} ml={56} mr={56} templateColumns="repeat(18, 1fr)" templateRows="repeat(18, 1fr)">
      {renderTrendingGames()}
    </Grid>
  );
}

export default TrendingGames;
