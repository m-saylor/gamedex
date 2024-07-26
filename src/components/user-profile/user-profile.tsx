import React from 'react';
import {
  Flex, Tabs, TabList, Tab, TabPanels, TabPanel,
} from '@chakra-ui/react';
import UserGames from './user-games/user-games';
import UserProfileHeader from './header/user-profile-header';
import JumpToTop from '../jump-to-top';

function UserProfile() {
  return (
    <Flex direction="column">
      <UserProfileHeader />
      <Tabs colorScheme="gray" marginTop="75px" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>GAMES</Tab>
          {/* <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>STATS</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserGames />
          </TabPanel>
          {/* <TabPanel>
            INSERT STATS HERE
          </TabPanel> */}
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </Flex>
  );
}

export default UserProfile;
