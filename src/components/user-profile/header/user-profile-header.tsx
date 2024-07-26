import {
  Avatar, Button, Flex, Link, Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SocialIconButtons from './social-icon-buttons';
import { fetchUser } from '../../../api/gamedex';

function UserProfileHeader() {
  // store user data
  // const following = 85;
  // const followers = 550;
  // const profileLink = 'linktr.ee/xgigglypuff';

  const { username } = useParams();
  const [userInfo, setUserInfo] = useState();

  console.log(userInfo);

  useEffect(() => {
    async function loadUser() {
      const user = await fetchUser(username);
      setUserInfo(user);
    }
    loadUser();
  }, [username]);

  if (!userInfo) {
    return null;
  }

  return (
    <Flex alignItems="center" direction="row" justifyContent="flex-start" marginLeft="100px" marginRight="100px" marginTop="50px">
      <Avatar
        size="2xl"
        src=""
      />
      <Flex alignItems="flex-start" direction="column" justifyContent="center" marginLeft="25px" marginRight="25px" width="250px">
        <Text fontSize="24px" fontWeight={700} marginTop="20px">
          {username}
        </Text>
        <Text fontSize="14px" marginTop="10px">
          {userInfo?.bio}
        </Text>
      </Flex>
      <Flex alignItems="flex-end" direction="column" justifyContent="flex-end" width="100%">
        {/* <Text>
          {following} Following
        </Text>
        <Text>
          {followers} Followers
        </Text> */}
        <Link href={`https://${userInfo?.website}`} isExternal>
          <Button variant="link">
            {userInfo?.website }
          </Button>
        </Link>
        <SocialIconButtons socials={userInfo?.socials} />
      </Flex>
    </Flex>
  );
}

export default UserProfileHeader;
