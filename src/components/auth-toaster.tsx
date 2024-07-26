import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuthMsg, useAuthenticated } from '../hooks/redux-hooks';

function AuthToaster({ onAuth }) {
  const toast = useToast();
  const authenticated = useAuthenticated();
  const message = useAuthMsg();

  useEffect(() => {
    if (authenticated && message) {
      toast({
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
        ...message,
      });
      onAuth();
    }
  }, [authenticated, message, toast, onAuth]);

  useEffect(() => {
    if (!authenticated && message) {
      toast({
        position: 'top',
        status: 'success',
        duration: 2500,
        isClosable: true,
        ...message,
      });
    }
  }, [authenticated, message, toast]);

  return null;
}

export default AuthToaster;
