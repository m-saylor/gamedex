import React, { useState, useCallback } from 'react';
import { Textarea, Flex } from '@chakra-ui/react';
import EditableButtons from './editable-buttons';

function UserInfoTextarea({
  defaultValue, height, text, setText,
}) {
  // state
  const [editMode, setEditMode] = useState(false);

  // display game title changes
  const onTextChange = useCallback((event) => {
    setText(event.target.value);
  }, [setText]);

  // update game card
  const onSave = useCallback(() => {
    setText(text);
    // dispatch(updateGame(selectedGame.id, navigate, title));
    setEditMode(false);
  }, [setText, text]);

  // cancel edits with the cancel button
  const onCancel = useCallback(() => {
    setEditMode(false);
    setText(defaultValue);
  }, [defaultValue, setText]);

  return (
    <Flex direction="row">
      <EditableTextarea defaultValue={defaultValue} editMode={editMode} height={height} setEditMode={setEditMode} text={text} onTextChange={onTextChange} />
      <EditableButtons editMode={editMode} setEditMode={setEditMode} onCancel={onCancel} onSave={onSave} />
    </Flex>
  );
}

function EditableTextarea({
  editMode, setEditMode, onTextChange, currentValue, text, height,
}) {
  const isInvalid = text.length > 280;

  if (editMode) {
    return (
      <Textarea
        alignItems="center"
        display="flex"
        focusBorderColor="#68d391"
        fontSize="14px"
        height={height}
        isInvalid={isInvalid}
        mr="5px"
        placeholder={currentValue}
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
      <Textarea
        alignItems="center"
        color="#5f6774"
        cursor="default"
        display="flex"
        focusBorderColor="#68d391"
        fontSize="14px"
        height={height}
        isInvalid={isInvalid}
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

export default UserInfoTextarea;
