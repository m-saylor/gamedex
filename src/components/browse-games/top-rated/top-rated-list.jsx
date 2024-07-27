// @ts-nocheck

import React, { useEffect } from 'react';
import {
  Card, CardBody, CardFooter, Image, Stack, Heading, Text,
  Progress,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { alternateCardColor } from '../../../utils/style-utils';
import GameListButton from '../../game/game-list-button';
import RankNumber from './rank-number.tsx';
import TopRatedSkeleton from './top-rated-skeleton.tsx';
import { useSelectedGame } from '../../../hooks/search-params-hooks';

function TopRatedList({ topRatedGames }) {
  // queries for the top 100 rated games from IGDB
  const queryClient = useQueryClient();
  const gamesData = topRatedGames?.data;

  // preloads game card data for each game on top rated list
  useEffect(() => {
    if (!gamesData) return;

    gamesData.forEach((game) => {
      queryClient.setQueryData(['selectedGame', String(game.id)], game);
    });
  }, [queryClient, gamesData]);

  // sets the selected game from the top rated list in the URL
  const { setSelectedGame } = useSelectedGame();

  // renders a skeleton loading state
  if (topRatedGames.isLoading) {
    return <TopRatedSkeleton />;
  }

  const renderedGames = gamesData?.map((game, index) => {
    const title = game.name.toUpperCase();
    const displayAvgRating = game.avgRating?.toFixed(2);
    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        key={game.id}
        ml={40}
        mr={40}
        overflow="hidden"
        variant={alternateCardColor(index)}
      >
        <RankNumber index={index} />

        <Image
          alignItems="center"
          alt="game cover photo"
          borderRadius={6}
          borderStyle="solid"
          borderWidth={3}
          cursor="pointer"
          maxH="140px"
          mb={3.5}
          mr={5}
          mt={3.5}
          objectFit="cover"
          src={game.coverUrl}
          onClick={() => setSelectedGame(game.id)}
        />

        <CardBody
          display="flex"
          flexDirection="row"
          padding="0px"
        >
          <Heading
            alignItems="center"
            cursor="pointer"
            display="flex"
            fontSize={18}
            fontWeight="700"
            width="100%"
            onClick={() => setSelectedGame(game.id)}
          >
            {title}
          </Heading>

          <Stack
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb="40px"
            ml="25px"
            mr="50px"
            width="80%"
          >
            <Text
              fontSize={18}
              fontWeight={700}
              mt="25px"
              py="2"
              textAlign="right"
            >
              {displayAvgRating}
            </Text>

            <Progress
              colorScheme="green"
              value={game.avgRating}
            />
          </Stack>
        </CardBody>

        <CardFooter
          alignItems="center"
          display="flex"
          justifyContent="flex-end"
          mr="20px"
        >
          <GameListButton id={game.id} onAdd={() => setSelectedGame(game.id)} />
        </CardFooter>
      </Card>
    );
  });

  return renderedGames;
}

export default TopRatedList;
