import React from 'react';
import {
  Card, CardBody, CardFooter, Image, Stack, Heading,
} from '@chakra-ui/react';
import { alternateCardColor } from '../../utils/style-utils';
import GameListButton from '../game/game-list-button';

function ResultsList({ games, onSelectGame }) {
  const renderedGames = games?.map((game, index) => {
    const title = game.name?.toUpperCase();

    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        height="131px"
        key={game.id}
        ml="250px"
        mr="250px"
        overflow="hidden"
        variant={alternateCardColor(index)}
      >
        <Image
          alignItems="center"
          alt="game cover photo"
          borderRadius={6}
          borderStyle="solid"
          borderWidth={3}
          cursor="pointer"
          maxH="100px"
          mb={3.5}
          ml={3.5}
          mr={5}
          mt={3.5}
          objectFit="cover"
          src={game.coverUrl}
          onClick={() => onSelectGame(game)}
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
            onClick={() => onSelectGame(game)}
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
          />
        </CardBody>

        <CardFooter
          alignItems="center"
          display="flex"
          justifyContent="flex-end"
          mr="20px"
        >
          <GameListButton id={game.id} onAdd={() => onSelectGame(game)} />
        </CardFooter>
      </Card>
    );
  });

  return renderedGames;
}

export default ResultsList;
