import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram, faSquareXTwitter, faTwitch,
  faYoutube, faDiscord, faSteam,

} from '@fortawesome/free-brands-svg-icons';
import { Flex, IconButton, Link } from '@chakra-ui/react';

function SocialIconButtons({ socials }) {
  // determine user socials

  if (!socials) {
    return null;
  }

  function renderSocialButtons() {
    return Object.entries(socials)?.map((entry) => {
      const social = entry[0];
      const url = entry[1];
      if (social === 'twitch') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faTwitch} size="lg" />} label="twitch" url={url} />;
      }
      if (social === 'twitter') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faSquareXTwitter} size="lg" />} label="twitter" url={url} />;
      }
      if (social === 'instagram') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faInstagram} size="lg" />} label="instagram" url={url} />;
      }
      if (social === 'steam') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faSteam} size="lg" />} label="steam" url={url} />;
      }
      if (social === 'youtube') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faYoutube} size="lg" />} label="youtube" url={url} />;
      }
      if (social === 'discord') {
        return <SocialIconButton icon={<FontAwesomeIcon icon={faDiscord} size="lg" />} label="discord" url={url} />;
      }
      return null;
    });
  }

  return (
    <Flex alignItems="center" direction="row" justifyContent="space-around">
      {renderSocialButtons()}
    </Flex>
  );
}

function SocialIconButton({ label, icon, url }) {
  return (
    <Link href={`https://${url}`} isExternal>
      <IconButton
        aria-label={label}
        cursor="pointer"
        icon={icon}
        src={url}
        variant="ghost"
      />
    </Link>
  );
}

export default SocialIconButtons;
