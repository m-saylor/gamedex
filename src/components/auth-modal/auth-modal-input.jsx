import React from 'react';

import { Input } from '@chakra-ui/react';

function AuthModalInput({
  value, onChange, onBlur, placeholder,
}) {
  return (
    <Input
      marginTop="10px"
      placeholder={placeholder}
      size="sm"
      type="text"
      value={value}
      width="70%"
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

export default AuthModalInput;
