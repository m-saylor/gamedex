import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { addSearchParam, removeSearchParam } from '../utils/router-utils';

const useSelectedGame = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGame = searchParams.get('selected');

  const setSelectedGame = useCallback((gameId) => {
    setSearchParams(addSearchParam('selected', gameId));
  }, [setSearchParams]);

  const clearSelectedGame = useCallback(() => {
    setSearchParams(removeSearchParam('selected'));
  }, [setSearchParams]);

  return { selectedGame, setSelectedGame, clearSelectedGame };
};

export default useSelectedGame;
