/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from 'react';
import {
  Grid, GridItem, Image, Skeleton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getSpan, TILE_INDEX_TO_GAME_INDEX } from '../../../utils/masonry-utils';
import { useTwitchTrendingGames, useIgdbTrendingGames, useSelectedGame } from '../../../hooks/redux-hooks';
import { selectGame } from '../../../actions';

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
  // hooks
  const dispatch = useDispatch();
  const hoverTimeoutRef = useRef();
  const trending = useTwitchTrendingGames();
  const igdbTrending = useIgdbTrendingGames();
  const gameModal = useSelectedGame();

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
    const igdbGame = igdbTrending?.games?.find((game) => String(game.id) === String(twitchGame.igdb_id));
    if (!igdbGame) {
      return;
    }
    const igdbCover = `https:${igdbTrending?.covers?.[igdbGame?.cover]}`.replace('thumb', 'cover_big');
    const igdbYear = igdbTrending?.years[igdbGame?.release_dates?.[0]];
    const igdbRating = igdbGame.rating;

    dispatch(selectGame(igdbGame, igdbCover, igdbYear, igdbRating));
  }, [dispatch, igdbTrending]);

  function renderTrendingGames() {
    const renderedGames = [];

    for (let idx = 0; idx < 78; idx += 1) {
      const span = getSpan(idx);
      const gameIdx = TILE_INDEX_TO_GAME_INDEX[idx];
      const game = trending?.[gameIdx];
      const gameStyles = getGameStyles(gameIdx, hoveredGameIdx, gameModal);

      if (game) {
        renderedGames.push(
          <GridItem
            colSpan={span}
            key={game.igdb_id}
            rowSpan={span}
            onClick={() => onSelectGame(game)}
            onMouseEnter={() => onMouseEnterGridItem(gameIdx)}
            onMouseLeave={onMouseLeaveGridItem}
          >
            {game ? (
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
