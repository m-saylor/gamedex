import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Heading, Text, Image, Stack,
  Card, CardBody, CardFooter,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  addUserGame, clearSelectedGame, deleteUserGame, updateUserGame,
} from '../../actions';
import {
  useAuthenticated, useUserGames, useUserInfo,
} from '../../hooks/redux-hooks';
import GameCardButtons from './game-card-buttons';
import { fetchGameCard } from '../../api/igdb';

function GameCard({ openAuthModal, isOpenAuthModal }) {
  // hooks
  const dispatch = useDispatch();
  const authenticated = useAuthenticated(); // to check if user is signed in
  const userInfo = useUserInfo();
  const userGames = useUserGames();
  const [searchParams, setSearchParams] = useSearchParams();
  const gameId = searchParams.get('selected');

  // query
  const { data: game } = useQuery({ queryKey: ['selectedGame', gameId], queryFn: () => fetchGameCard(gameId), enabled: gameId !== undefined });

  console.log(game?.coverUrl);

  // state
  const [userRating, setUserRating] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // store the user data
  const username = userInfo?.username;

  // store the game data
  const title = game?.name;
  const avgRating = game?.avgRating?.toFixed(2); // avg rating rounded to two decimals
  const id = game?.id;
  const gameInLibrary = userGames.find((savedGame) => String(savedGame.id) === String(id));

  // render the edit mode of the game card
  useEffect(() => {
    if (gameInLibrary) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [gameInLibrary]);

  // Chakra modal setup
  const finalRef = React.useRef(null);

  useEffect(() => {
    const rating = userInfo.games?.[game?.id];
    if (rating) {
      setUserRating(rating);
    }
  }, [game, userInfo.games]);

  const onCloseGame = useCallback(() => {
    setSearchParams((prevParams) => {
      const newParams = { ...prevParams };
      delete newParams.selected;
      return newParams;
    });
    setUserRating(0);
    dispatch(clearSelectedGame());
  }, [dispatch, setSearchParams]);

  // save + log the game
  const onLogGame = useCallback(() => {
    // store the game model
    const savedGame = {
      id,
      name: game?.name,
      coverUrl: game?.coverUrl,
      summary: game?.summary,
      releaseYear: game?.year,
      avgRating,

    };

    if (!authenticated) { // if not logged in
      openAuthModal();
    } else if (userRating === 0) { // if no rating is made
      dispatch(addUserGame(userGames, username, savedGame));
      onCloseGame();
    } else {
      // save the game with all data
      dispatch(addUserGame(userGames, username, savedGame, userRating));
      onCloseGame();
    }
  }, [id, game?.name, game?.coverUrl, game?.summary, game?.year, avgRating, authenticated, userRating, openAuthModal, dispatch, userGames, username, onCloseGame]);

  // delete the game from user games
  const onDeleteGame = useCallback(
    () => {
      // delete the saved game entry
      dispatch(deleteUserGame(userGames, username, id));
      onCloseGame();
    },
    [dispatch, userGames, username, id, onCloseGame],
  );

  // update the saved game entry
  const onUpdateGame = useCallback(
    () => {
      // delete the saved game entry
      dispatch(updateUserGame(userGames, username, game, userRating));
      onCloseGame();
    },
    [dispatch, userGames, username, game, userRating, onCloseGame],
  );

  if (!game) {
    return null;
  }

  return (
    <div>
      <Modal blockScrollOnMount={false}
        finalFocusRef={finalRef}
        isCentered
        isOpen
        scrollBehavior="inside"
        onClose={onCloseGame}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding="0px">
            <Card
              alignItems="center"
              display={isOpenAuthModal ? 'none' : 'flex'}
              flexDirection="column"
              justifyContent="center"
            >
              <ModalCloseButton />
              <Heading
                marginTop="10px"
                size="md"
                textAlign="center"
                width="80%"
              >
                {title}
              </Heading>
              <Text
                fontSize="12px"
                fontWeight={700}
                mt="10px"
                textAlign="center"
              >
                {game.year}
              </Text>
              <CardBody
                alignItems="center"
                display="flex"
                flexDir="column"
                paddingBottom="0px"
              >
                <Image
                  alt="Game cover"
                  borderRadius="lg"
                  h="280px"
                  src={game.coverUrl}
                />
                <Text
                  fontSize="12px"
                  fontWeight={700}
                  mt="5px"
                  textAlign="center"
                >
                  AVG RATING: {avgRating}
                </Text>
                <Stack mt="6" spacing="3">
                  <Text
                    fontSize="13px"
                    ml="15px"
                    mr="15px"
                    textAlign="center"
                  >
                    {game.summary}
                  </Text>
                  <Text
                    fontSize="12px"
                    fontWeight={700}
                    mt="5px"
                    textAlign="center"
                  >
                    MY RATING: {userRating}
                  </Text>
                  <Slider
                    aria-label="Your game rating"
                    colorScheme="green"
                    value={userRating}
                    onChange={(val) => setUserRating(val)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Stack>
              </CardBody>
              <CardFooter>
                <GameCardButtons editMode={editMode} onDelete={onDeleteGame} onSave={onLogGame} onUpdate={onUpdateGame} />
              </CardFooter>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GameCard;
