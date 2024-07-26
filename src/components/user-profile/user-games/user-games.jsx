import React, { useCallback, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UserGame from './user-game';
import { useUserInfo } from '../../../hooks/redux-hooks';
import { getUserGames } from '../../../api/gamedex';
import { useSelectedGame } from '../../../hooks/search-params-hooks';

function UserGames() {
  // hooks
  const { setSelectedGame } = useSelectedGame();
  const { username } = useParams();

  // queries
  const queryClient = useQueryClient();
  const { data: games } = useQuery({ queryKey: ['userGames', username], queryFn: () => getUserGames(username) });

  // your own info
  const userInfo = useUserInfo();

  // own profile page or someone else's
  const isUserPage = userInfo.username === username;

  // preloads game card data for each game on trending grid
  useEffect(() => {
    if (!games || !isUserPage) return;

    games.forEach((game) => {
      queryClient.setQueryData(['selectedGame', String(game.id)], game);
    });
  }, [queryClient, games, isUserPage]);

  // select game and fetch data
  const onSelectGame = useCallback((game) => {
    setSelectedGame(game.id);
  }, [setSelectedGame]);

  if (!games) {
    return null;
  }

  const renderGame = games?.map((game) => {
    const { id } = game;

    return (
      <UserGame game={game} isUserPage={isUserPage} key={id} selectGame={() => onSelectGame(game)} username={username} />
    );
  });

  return (
    <SimpleGrid margin="10px 80px 20px 80px" spacing={2} templateColumns="repeat(auto-fill, minmax(150px, 1fr))">
      {renderGame}
    </SimpleGrid>
  );
}

export default UserGames;
