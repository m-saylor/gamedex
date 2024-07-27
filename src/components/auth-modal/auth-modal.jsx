// @ts-nocheck

import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signinUser, signupUser } from '../../actions';
import AuthModalButtons from './auth-modal-buttons';
import AuthModalInputs from './auth-modal-inputs';
import { useOnKeyDown, ENTER_KEY } from '../../hooks/event-hooks';
// import { AuthModalProps } from '~/utils/props-typing-utils';

function AuthModal(
  {
    isOpen, onClose, accountStatus, setAccountStatus,
  },
) {
  // state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(signupUser({ username, email, password }, navigate));
  };

  // to log in a user
  const loginUser = useCallback(() => {
    dispatch(signinUser({ emailOrUsername, password }, navigate));
  }, [dispatch, emailOrUsername, navigate, password]);

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
