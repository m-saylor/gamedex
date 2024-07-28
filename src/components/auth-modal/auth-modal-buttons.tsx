import React from 'react';
import { Button } from '@chakra-ui/react';
import { signInPrompt, signUpPrompt } from '../../utils/text-utils';

interface AuthModalButtonsProps {
  accountStatus: boolean;
  setAccountStatus: (accountStatus: boolean) => void;
  logIn: () => void;
  signUp: () => void;
}

// a function to render modal buttons according to sign up / sign in
function AuthModalButtons({
  accountStatus, setAccountStatus, logIn, signUp,
}: AuthModalButtonsProps) {
  if (accountStatus) {
    return (
      <div className="auth-buttons">
        <Button colorScheme="green" type="submit" onClick={logIn}>Log In</Button>
        <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccountStatus(false)}>{signUpPrompt}</Button>
      </div>
    );
  } else {
    return (
      <div className="auth-buttons">
        <Button colorScheme="green" type="submit" onClick={signUp}>Sign Up</Button>
        <Button colorScheme="gray" fontSize="small" variant="link" onClick={() => setAccountStatus(true)}>{signInPrompt}</Button>
      </div>
    );
  }
}

export default AuthModalButtons;
