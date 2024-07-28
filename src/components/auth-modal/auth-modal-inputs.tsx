import React from 'react';
import { ModalBody, Input } from '@chakra-ui/react';

import PasswordInput from './password-input.tsx';
import { useAuthError } from '../../hooks/redux-hooks.ts';

interface AuthModalInputsProps {
  email: string;
  username: string;
  emailOrUsername: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
  setEmailOrUsername: (emailOrUsername: string) => void;
  accountStatus: boolean;
  logInOnEnter: () => void;
  signUpOnEnter: () => void;
}

function AuthModalInputs({
  email, username, emailOrUsername, password, setEmail, setPassword,
  accountStatus, setUsername, setEmailOrUsername, logInOnEnter, signUpOnEnter,
}: AuthModalInputsProps) {
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
