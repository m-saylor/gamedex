import React, { useCallback } from 'react';
import { ModalBody } from '@chakra-ui/react';
import AuthModalInput from './auth-modal-input';
import PasswordInput from './password-input';
// import VerifyInputIcon from './verify-input-icon';
import { fetchUser } from '../../api/gamedex';
import { useAuthError } from '../../hooks/redux-hooks';

function AuthModalInputs({
  email, username, emailOrUsername, password, setEmail, setPassword,
  account, setUsername, setEmailOrUsername, logInOnEnter, signUpOnEnter,
}) {
  const authError = useAuthError();

  // check if username is taken
  const onUsernameBlur = useCallback(async () => {
    if (username.length > 0) {
      const isTaken = await fetchUser(username);
      console.log(isTaken);
    }
  }, [username]);

  // if logging in (account already exists)
  if (account) {
    return (
      <ModalBody className="auth-form">
        {/* <HStack> */}
        <AuthModalInput
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        {/* <VerifyInputIcon /> */}
        {/* </HStack> */}
        <PasswordInput password={password} setPassword={setPassword} onEnter={logInOnEnter} />
        <div>{authError}</div>
      </ModalBody>
    );
  } else {
    return (
      <ModalBody className="auth-form">
        <AuthModalInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <AuthModalInput placeholder="Username" value={username} onBlur={onUsernameBlur} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput password={password} setPassword={setPassword} onEnter={signUpOnEnter} />
        <div>{authError}</div>
      </ModalBody>
    );
  }
}

export default AuthModalInputs;
