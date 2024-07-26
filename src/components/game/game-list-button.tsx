import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { CheckIcon, AddIcon } from '@chakra-ui/icons';
import { useUserGames } from '../../hooks/redux-hooks';

function GameListButton({ onAdd, id }) {
  // check if game is in your logged games library
  const userGames = useUserGames();
  const gameInLibrary = userGames.find((game) => String(game.id) === String(id));

  // if game is logged, show a check button which can edit the entry
  if (gameInLibrary) {
    return (
      <IconButton
        _hover={{ bg: '#68d391' }}
        aria-label="Game is in your library"
        bg="#9ae6b4"
        color="white"
        fontSize="12px"
        fontWeight={900}
        icon={<CheckIcon />}
        isRound
        size="sm"
        variant="outline"
        onClick={onAdd}
      />
    );
    // else show a plus button to add the game to your gamedex
  } else {
    return (
      <IconButton
        aria-label="Add game to your games"
        cursor="pointer"
        fontSize="10px"
        fontWeight={800}
        icon={<AddIcon />}
        isRound
        size="sm"
        variant="outline"
        onClick={onAdd}
      />
    );
  }
}

export default GameListButton;
