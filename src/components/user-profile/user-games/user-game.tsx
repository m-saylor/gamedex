import React, { useState } from 'react';
import { Image, CardBody, Card } from '@chakra-ui/react';
import EditSavedGameButtons from './edit-saved-game-buttons';
import { useAuthenticated } from '../../../hooks/redux-hooks';

function UserGame({
  isUserPage, game, selectGame, username,
}) {
  // hooks
  const authenticated = useAuthenticated(); // to check if user is signed in

  // state to display hover buttons
  const [hovered, setHovered] = useState(false);

  // if it is your profile - signed in
  if (authenticated && isUserPage) {
    return (
      <div
        onMouseEnter={(e) => {
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
        }}
      >
        <EditSavedGameButtons display={hovered} game={game} selectGame={selectGame} username={username} />
        <Card
          alignItems="center"
          className={hovered ? 'gray-on-hover' : 'not-gray-on-hover'}
          cursor="pointer"
          justifyContent="center"
          maxW="fit-content"
          onClick={selectGame}
        >
          <CardBody padding="4px">
            <Image
              alt="Game cover"
              borderRadius="lg"
              maxH="200px"
              src={game.coverUrl}
              transition="opacity 0.3s"
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Card
          alignItems="center"
          cursor="pointer"
          justifyContent="center"
          maxW="fit-content"
          onClick={selectGame}
        >
          <CardBody padding="4px">
            <Image
              alt="Game cover"
              borderRadius="lg"
              maxH="200px"
              src={game.coverUrl}
              transition="opacity 0.3s"
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserGame;
