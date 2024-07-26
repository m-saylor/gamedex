import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuthenticated } from './redux-hooks';

function useAuthToaster(title) {
  const authenticated = useAuthenticated();
  const toast = useToast();

  useEffect(() => {
    if (authenticated) {
      toast({
        position: 'top',
        title,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [authenticated, title, toast]);
}

export default useAuthToaster;
