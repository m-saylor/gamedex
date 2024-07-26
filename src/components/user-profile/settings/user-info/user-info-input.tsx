import React, { useCallback, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import EditableButtons from './editable-buttons';
import EditableUserInput from './editable-user-input';

function UserInfoInput({
  defaultValue, height, text, setText,
}) {
  // hooks
//   const dispatch = useDispatch();

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
      <EditableUserInput defaultValue={defaultValue} editMode={editMode} height={height} setEditMode={setEditMode} text={text} onTextChange={onTextChange} />
      <EditableButtons editMode={editMode} setEditMode={setEditMode} onCancel={onCancel} onSave={onSave} />
    </Flex>
  );
}

export default UserInfoInput;
