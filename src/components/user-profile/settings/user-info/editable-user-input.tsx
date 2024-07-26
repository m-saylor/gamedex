import React from 'react';
import { Input } from '@chakra-ui/react';

function EditableUserInput({
  editMode, setEditMode, onTextChange, defaultValue, text, height,
}) {
  if (editMode) {
    return (
      <Input
        alignItems="center"
        display="flex"
        focusBorderColor="#68d391"
        fontSize="14px"
        height={height}
        mr="5px"
        placeholder={defaultValue}
        textAlign="left"
        value={text}
        variant="outline"
        width="500px"
        onBlur={() => setEditMode(false)}
        onChange={onTextChange}
      />
    );
  } else {
    return (
      <Input
        alignItems="center"
        color="#5f6774"
        cursor="default"
        display="flex"
        focusBorderColor="#68d391"
        fontSize="14px"
        height={height}
        mr="5px"
        textAlign="left"
        value={text}
        variant="filled"
        width="500px"
        onChange={() => {}}
        onClick={() => setEditMode(true)}
        onFocus={() => setEditMode(true)}
      />
    );
  }
}

export default EditableUserInput;
