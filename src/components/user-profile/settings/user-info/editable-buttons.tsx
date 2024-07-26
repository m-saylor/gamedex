import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

function EditableButtons({
  editMode, setEditMode, onSave, onCancel,
}) {
  if (editMode) {
    return (
      <Flex justifyContent="flex-end" size="sm">
        <IconButton
          _hover={{
            bg: '#68d391',
          }}
          aria-label="Save edit"
          bg="#9ae6b4"
          color="white"
          icon={<CheckIcon />}
          mr="4px"
          size="sm"
          onMouseDown={onSave}
        />
        <IconButton
          aria-label="Cancel edit"
          icon={<CloseIcon />}
          size="sm"
          onMouseDown={onCancel}
        />
      </Flex>
    );
  } else {
    return (
      <Flex justifyContent="flex-end">
        <IconButton
          aria-label="Edit"
          icon={<EditIcon />}
          size="sm"
          variant="ghost"
          width="100%"
          onClick={() => setEditMode(true)}
        />
      </Flex>
    );
  }
}

export default EditableButtons;
