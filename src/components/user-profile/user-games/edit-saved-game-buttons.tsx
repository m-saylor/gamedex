import React, { useCallback } from 'react';
import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteUserGame } from '../../../actions';
import { useUserGames } from '../../../hooks/redux-hooks';

// show edit and delete buttons on game card hover
function EditSavedGameButtons({
  game, display, username, selectGame,
}) {
  // hooks
  const dispatch = useDispatch();
  const userGames = useUserGames();

  const onDeleteGame = useCallback(
    () => {
    // store the game ID
      const id = game?.id;

      // delete the saved game entry
      dispatch(deleteUserGame(userGames, username, id));
    },
    [game?.id, dispatch, userGames, username],
  );

  return (
    <ButtonGroup
      alignItems="center"
      display={display ? 'flex' : 'none'}
      height="208px"
      justifyContent="center"
      position="absolute"
      width="158px"
      zIndex={3}
    >
      <IconButton
        aria-label="Edit the saved game entry"
        icon={<EditIcon />}
        isRound
        variant="ghost"
        onClick={selectGame}
      />
      <IconButton
        aria-label="Delete the saved game entry"
        icon={<DeleteIcon />}
        isRound
        variant="ghost"
        onClick={onDeleteGame}
      />
    </ButtonGroup>
  );
}

export default EditSavedGameButtons;
