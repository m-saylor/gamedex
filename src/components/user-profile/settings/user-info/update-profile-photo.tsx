import React, { useRef } from 'react';
import {
  InputGroup, Button, Flex, Center, Avatar,
  Stack, AvatarBadge, IconButton,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

function UpdateProfilePhoto({ img, handleUpload }) {
  const inputRef = useRef(null);

  const handleUpdate = () => {
    inputRef.current?.click();
  };

  return (
    <Stack direction={['column', 'row']} spacing={6}>
      <Center>
        <Avatar
          alt="profile photo preview"
          size="xl"
          src={img.preview}
        >
          <AvatarBadge
            aria-label="remove Image"
            as={IconButton}
            colorScheme="pink"
            icon={<SmallCloseIcon />}
            rounded="full"
            size="sm"
            top="-10px"
          />
        </Avatar>
      </Center>
      <Flex alignItems="center" direction="row">
        <InputGroup onClick={handleUpdate}>
          <input
            accept="image/*"
            hidden
            ref={inputRef}
            type="file"
            onChange={handleUpload}
          />
          <Button
            fontSize="13.5px"
            fontWeight={700}
          >UPDATE
          </Button>
        </InputGroup>
      </Flex>
    </Stack>
  );
}

export default UpdateProfilePhoto;
