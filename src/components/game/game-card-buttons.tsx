import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface GameCardButtonProps {
  onSave: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  editMode: boolean;
}

function GameCardButtons({
  onSave, onUpdate, onDelete, editMode,
}: GameCardButtonProps) {
  if (editMode) {
    return (
      <ButtonGroup spacing="2">
        <Button
          variant="greenAdd"
          onClick={onUpdate}
        >
          SAVE
        </Button>
        <Button
          variant="redSolid"
          onClick={onDelete}
        >
          DELETE
        </Button>
      </ButtonGroup>
    );
  } else {
    return (
      <ButtonGroup spacing="2">
        <Button
          variant="greenAdd"
          onClick={onSave}
        >
          ADD
        </Button>
      </ButtonGroup>
    );
  }
}

export default GameCardButtons;
