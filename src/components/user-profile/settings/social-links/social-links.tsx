import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Flex, Stack, useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import UserInfoInput from '../user-info/user-info-input';
import { useUserInfo } from '../../../../hooks/redux-hooks';
import { updateUser } from '../../../../actions';

const SOCIALS = {
  TWITCH: 'twitch',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  STEAM: 'steam',
  YOUTUBE: 'youtube',
  DISCORD: 'discord',
};

function SocialLinksSettings() {
  // hooks
  const userInfo = useUserInfo();
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // store links
  const [twitchUrl, setTwitchUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [steamUrl, setSteamUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');

  // clear save sate on page load
  useEffect(() => {
    setIsSaving(false);
    setSaved(false);
  }, []);

  // set urls on page load
  useEffect(() => {
    if (userInfo?.socials) {
      Object.entries(userInfo.socials).forEach((entry) => {
        const social = entry[0];
        const url = entry[1];
        switch (social) {
          case SOCIALS.TWITCH:
            setTwitchUrl(url);
            break;
          case SOCIALS.TWITTER:
            setTwitterUrl(url);
            break;
          case SOCIALS.INSTAGRAM:
            setInstagramUrl(url);
            break;
          case SOCIALS.STEAM:
            setSteamUrl(url);
            break;
          case SOCIALS.YOUTUBE:
            setYoutubeUrl(url);
            break;
          case SOCIALS.DISCORD:
            setDiscordUrl(url);
            break;
          default:
        }
      });
    }
  }, [userInfo]);

  const onSave = useCallback(async () => {
    setIsSaving(true);
    const socials = {};
    if (twitchUrl && twitchUrl !== '') {
      socials.twitch = twitchUrl;
    }
    if (twitterUrl && twitterUrl !== '') {
      socials.twitter = twitterUrl;
    }
    if (instagramUrl && instagramUrl !== '') {
      socials.instagram = instagramUrl;
    }
    if (steamUrl && steamUrl !== '') {
      socials.steam = steamUrl;
    }
    if (youtubeUrl && youtubeUrl !== '') {
      socials.youtube = youtubeUrl;
    }
    if (discordUrl && discordUrl !== '') {
      socials.discord = discordUrl;
    }
    const newUser = { ...userInfo, socials };
    const user = await dispatch(updateUser(userInfo.username, newUser));
    if (user) {
      setSaved(true);
    }
    setIsSaving(false);
  }, [discordUrl, dispatch, instagramUrl, steamUrl, twitchUrl, twitterUrl, userInfo, youtubeUrl]);

  return (
    <Flex align="flex-start"
      bg={useColorModeValue('gray.50', 'gray.800')}
      justify="center"
      marginTop="15px"
    >
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        margin={0}
        maxW="60%"
        p={6}
        rounded="lg"
        spacing={4}
        w="full"
      >
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="10px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Twitch</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.twitch ?? ''} height="40px" setText={setTwitchUrl} text={twitchUrl} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Instagram</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.instagram ?? ''} height="40px" setText={setInstagramUrl} text={instagramUrl} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Twitter</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.twitter ?? ''} height="40px" setText={setTwitterUrl} text={twitterUrl} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">YouTube</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.youtube ?? ''} height="40px" setText={setYoutubeUrl} text={youtubeUrl} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 30px 30px">
          <Text fontWeight={600} width="18%">Steam</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.steam ?? ''} height="40px" setText={setSteamUrl} text={steamUrl} />
        </Flex>
        <Flex alignItems="center" direction="row" justifyContent="flex-start" margin="0px 0px 50px 30px">
          <Text fontWeight={600} width="18%">Discord</Text>
          <UserInfoInput defaultValue={userInfo?.socials?.discord ?? ''} height="40px" setText={setDiscordUrl} text={discordUrl} />
        </Flex>
        <Flex direction="row" justifyContent="flex-end">
          <Button
            isLoading={isSaving}
            leftIcon={saved ? <CheckIcon /> : null}
            loadingText="SAVING"
            variant="solidPink"
            w="85px"
            onClick={onSave}
          >
            {saved ? ('SAVED') : ('SAVE')}
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SocialLinksSettings;
