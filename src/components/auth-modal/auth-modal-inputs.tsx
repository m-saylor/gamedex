import React, { useCallback } from 'react';
import { ModalBody } from '@chakra-ui/react';
import PasswordInput from './password-input';
import { useAuthError } from '../../hooks/redux-hooks';
import { AuthModalProps } from '~/utils/props-typing-utils';
import { Input } from '@chakra-ui/react';

function AuthModalInputs({
  email, username, emailOrUsername, password, setEmail, setPassword,
  accountStatus, setUsername, setEmailOrUsername, logInOnEnter, signUpOnEnter,
}: AuthModalProps) {
  const authError = useAuthError();

  // if logging in (account already exists)
  if (accountStatus) {
    return (
      <ModalBody className="auth-form">
        <Input
          marginTop="10px"
          placeholder="Email or Username"
          size="sm"
          type="text"
          value={emailOrUsername}
          width="70%"
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <PasswordInput password={password} setPassword={setPassword} onEnter={logInOnEnter} />
        <div>{authError}</div>
      </ModalBody>
    );
  } else {
    return (
      <ModalBody className="auth-form">
        <Input
          marginTop="10px"
          placeholder="Email"
          size="sm"
          type="text"
          value={email}
          width="70%"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          marginTop="10px"
          placeholder="Username"
          size="sm"
          type="text"
          value={username}
          width="70%"
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput password={password} setPassword={setPassword} onEnter={signUpOnEnter} />
        <div>{authError}</div>
      </ModalBody>
    );
  }
}

export default AuthModalInputs;
