import React from 'react';
import { Button } from '@chakra-ui/react';
import { signInPrompt, signUpPrompt } from '../../utils/text-utils';

// a function to render modal buttons according to sign up / sign in
function AuthModalButtons({
  account, setAccount, logIn, signUp,
}) {
  if (account) {
    return (
      <div className="auth-buttons">
        <Button colorScheme="green" type="submit" onClick={logIn}>Log In</Button>
        <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccount(false)}>{signUpPrompt}</Button>
      </div>
    );
  } else {
    return (
      <div className="auth-buttons">
        <Button colorScheme="green" type="submit" onClick={signUp}>Sign Up</Button>
        <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccount(true)}>{signInPrompt}</Button>
      </div>
    );
  }
}

export default AuthModalButtons;
