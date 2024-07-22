// import React, { ReactNode } from 'react';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// import { useLocation } from 'react-router-dom';
import {
  IconButton, Box, Flex, Button, Image,
  useColorModeValue, HStack, useColorMode,
} from '@chakra-ui/react';
import {
  MoonIcon, SunIcon, BellIcon,
} from '@chakra-ui/icons';
import { SignInButton } from '@clerk/clerk-react';
import SearchBar from './search-bar';
import { signoutUser } from '../../actions';
import { useAuthenticated } from '../../hooks/redux-hooks';
import NavProfileMenu from './nav-profile-menu';

function NavBar({
  onOpen, setAccountStatus, username,
}) {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const location = useLocation().pathname;
  const { colorMode, toggleColorMode } = useColorMode();
  const authenticated = useAuthenticated();

  // button functions
  const signOut = () => {
    dispatch(signoutUser(navigate));
  };

  const handleSignUp = useCallback(() => {
    onOpen();
    setAccountStatus(false);
  }, [onOpen, setAccountStatus]);

  const handleLogIn = useCallback(() => {
    onOpen();
    setAccountStatus(true);
  }, [onOpen, setAccountStatus]);

  const handleBrowseGames = useCallback(() => {
    navigate('/browse');
  }, [navigate]);

  const handleYourProfile = useCallback(() => {
    navigate(`/${username}`);
  }, [navigate, username]);

  const handleSettings = useCallback(() => {
    navigate(`/${username}/settings`);
  }, [navigate, username]);

  const handleHomeButton = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleColorModeClick = useCallback(() => {
    toggleColorMode();
    const userColorMode = localStorage.getItem('chakra-ui-color-mode');
    localStorage.setItem('user-color-mode', userColorMode);
  }, [toggleColorMode]);

  // if signed in, render a different menu
  function renderMenu() {
    if (authenticated) {
      return (
        <HStack variant="navButtonRow">
          <Flex alignItems="center">
            <HStack spacing={3}>
              <IconButton
                aria-label="View notifications"
                colorScheme="gray"
                icon={<BellIcon />}
                size="lg"
                variant="ghost"
              />
            </HStack>
          </Flex>
          <NavProfileMenu handleBrowseGames={handleBrowseGames} handleSettings={handleSettings} handleYourProfile={handleYourProfile} signOut={signOut} username={username} />
        </HStack>
      );
    } else {
      return (
        <HStack variant="navButtonRow">
          <Button variant="ghostBW" onClick={handleBrowseGames}>
            BROWSE GAMES
          </Button>
          <SignInButton>
            <Button variant="ghostBW" onClick={handleLogIn}>
              LOG IN
            </Button>
          </SignInButton>
          <Button variant="solidPink" onClick={handleSignUp}>
            SIGN UP
          </Button>
        </HStack>
      );
    }
  }

  // render a search bar when not on the home page
  function renderSearchBar() {
    // temp browse games homepage
    // if (location === '/') {
    //   return null;
    // } else {
    return (
      <SearchBar />
    );
  }

  return (
    <div className="home-nav-bar">
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex alignItems="center" h={16} justifyContent="space-between">
          <Flex justifyContent="flex-start" width="100%">
            <Button cursor="pointer" variant="link" onClick={handleHomeButton}>
              <Image _hover={{ filter: 'brightness(0.8)' }} borderRadius="8px" height="32px" src="src/media/temp-logo.png" />
            </Button>
          </Flex>
          <Flex alignItems="center" justifyContent="center" width="100%">
            {renderSearchBar()}
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" width="100%">
            <HStack spacing={3}>
              <Button id="light-dark-mode-button" variant="ghostBW" onClick={handleColorModeClick}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {renderMenu()}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default NavBar;
