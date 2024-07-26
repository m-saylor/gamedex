import {
  Tab, Tabs, TabList, TabPanel, TabPanels, Heading, Flex,
} from '@chakra-ui/react';
import React from 'react';
import UserInfoSettings from './user-info/user-info';
import SocialLinksSettings from './social-links/social-links';

function Settings({ user, username }) {
  return (
    <Tabs colorScheme="gray" marginTop="75px" variant="soft-rounded">
      <TabList display="flex" justifyContent="center" margin={10}>
        <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>EDIT PROFILE</Tab>
        {/* <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>ACCOUNT SETTINGS</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex justify="center">
            <Heading fontSize="17px" fontWeight={700} maxW="60%" textAlign="left">
              USER INFORMATION
            </Heading>
          </Flex>
          <UserInfoSettings username={username} />
          <Flex justify="center" marginTop="80px">
            <Heading fontSize="17px" fontWeight={700} maxW="60%" textAlign="left">
              SOCIAL LINKS
            </Heading>
          </Flex>
          <SocialLinksSettings />
        </TabPanel>
        {/* <TabPanel>
            INSERT ACCOUNT SETTINGS HERE
          </TabPanel> */}
      </TabPanels>
    </Tabs>
  );
}

export default Settings;
