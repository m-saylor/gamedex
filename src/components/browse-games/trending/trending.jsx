/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Grid, GridItem, Image, Skeleton,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSpan, TILE_INDEX_TO_GAME_INDEX } from '../../../utils/masonry-utils';
import { getTrendingGames } from '../../../api/twitch';
import { fetchGameCardsFromTwitchToIGDB } from '../../../api/igdb';
import { getTrendingGameStyles } from '../../../utils/style-utils';
import useSelectedGame from '../../../hooks/use-selected-game';

function TrendingGames() {
  // queries for trending games from twitch and their info from IGDB
  const queryClient = useQueryClient();
  const trendingTwitch = useQuery({ queryKey: ['trendingTwitchResults'], queryFn: getTrendingGames });
  const twitchData = trendingTwitch?.data;
  const trendingIGDB = useQuery({
    queryKey: ['trendingIGDBResults', twitchData],
    queryFn: () => fetchGameCardsFromTwitchToIGDB(twitchData),
    enabled: twitchData !== undefined,
  });
  const igdbGames = trendingIGDB?.data;

  // preloads game card data for each game on trending grid
  useEffect(() => {
    if (!igdbGames) return;

    igdbGames.forEach((game) => {
      queryClient.setQueryData(['selectedGame', String(game.id)], game);
    });
  }, [queryClient, igdbGames]);

  // sets the selected game from the trending grid in the URL
  const { selectedGame, setSelectedGame } = useSelectedGame();

  // implements and times out the hover effect
  const hoverTimeoutRef = useRef();
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

  function renderTrendingGames() {
    const renderedGames = [];

    for (let idx = 0; idx < 78; idx += 1) {
      const span = getSpan(idx);
      const gameIdx = TILE_INDEX_TO_GAME_INDEX[idx];
      const game = twitchData?.[gameIdx];
      const gameStyles = getTrendingGameStyles(gameIdx, hoveredGameIdx, selectedGame);
      const isLoading = !game || trendingTwitch.isLoading;

      if (game) {
        renderedGames.push(
          <GridItem
            colSpan={span}
            key={`${game.igdb_id}-${idx}`}
            rowSpan={span}
            onClick={() => setSelectedGame(game.igdb_id)}
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
