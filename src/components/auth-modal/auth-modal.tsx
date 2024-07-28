import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton,
} from '@chakra-ui/react';
import { signInUser, signUpUser } from '../../actions/index.ts';
import AuthModalButtons from './auth-modal-buttons.tsx';
import AuthModalInputs from './auth-modal-inputs.tsx';
import { useOnKeyDown, ENTER_KEY } from '../../hooks/event-hooks';
import { useAppDispatch } from '../../hooks/redux-hooks.ts';

interface AuthModalProps {
  accountStatus: boolean;
  setAccountStatus: (accountStatus: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal(
  {
    isOpen, onClose, accountStatus, setAccountStatus,
  }: AuthModalProps,
) {
  // state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');

  // hooks
  const dispatch = useAppDispatch();

  // clear state on close
  useEffect(() => {
    if (!isOpen) {
      setUsername('');
      setEmail('');
      setEmailOrUsername('');
      setPassword('');
    }
  }, [isOpen, setEmail, setEmailOrUsername, setPassword, setUsername]);

  // to sign up a user
  const createUser = () => {
    dispatch(signUpUser({ username, email, password }));
  };

  // to log in a user
  const loginUser = useCallback(() => {
    dispatch(signInUser({ emailOrUsername, password }));
  }, [dispatch, emailOrUsername, password]);

  // also log in when the user presses enter
  const logInOnEnter = useOnKeyDown(loginUser, ENTER_KEY);

  // sign up when the user presses enter
  const signUpOnEnter = useOnKeyDown(createUser, ENTER_KEY);

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="150px">
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <AuthModalInputs
            accountStatus={accountStatus}
            email={email}
            emailOrUsername={emailOrUsername}
            logInOnEnter={logInOnEnter}
            password={password}
            setEmail={setEmail}
            setEmailOrUsername={setEmailOrUsername}
            setPassword={setPassword}
            setUsername={setUsername}
            signUpOnEnter={signUpOnEnter}
            username={username}
          />
          <ModalFooter>
            <AuthModalButtons accountStatus={accountStatus} logIn={loginUser} setAccountStatus={setAccountStatus} signUp={createUser} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AuthModal;
