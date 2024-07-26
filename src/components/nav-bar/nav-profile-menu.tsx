import React from 'react';
import {
  Menu, MenuButton, Button, Avatar, MenuList, Center, MenuDivider, MenuItem,
} from '@chakra-ui/react';

function NavProfileMenu({
  handleBrowseGames, signOut, username, handleYourProfile, handleSettings,
}) {
  return (
    <Menu className="profile-menu">
      <MenuButton
        as={Button}
        cursor="pointer"
        minW={0}
        rounded="full"
        variant="link"
      >
        <Avatar
          size="sm"
          src=""
        />
      </MenuButton>
      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar
            size="2xl"
            src=""
          />
        </Center>
        <br />
        <Center>
          <p>{username}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={handleYourProfile}>Your Profile</MenuItem>
        <MenuItem onClick={handleBrowseGames}>Browse Games</MenuItem>
        <MenuItem onClick={handleSettings}>Settings</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default NavProfileMenu;
