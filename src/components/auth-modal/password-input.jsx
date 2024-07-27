// @ts-nocheck

import React, { useState } from 'react';
import {
  Input, InputGroup, InputRightElement, IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
// import { AuthModalProps } from '~/utils/props-typing-utils';

function PasswordInput({ setPassword, onEnter }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((prev) => !prev);

  return (
    <InputGroup width="70%">
      <Input
        marginTop="10px"
        placeholder="Password"
        size="sm"
        type={show ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onEnter}
      />
      <InputRightElement
        marginTop="5.5px"
        size="sm"
      >
        <IconButton
          aria-label="Toggle show password"
          colorScheme="gray"
          h="80%"
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
          size="sm"
          variant="link"
          onClick={handleClick}
        />
      </InputRightElement>
    </InputGroup>

  );
}

export default PasswordInput;
