import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { addSearchParam, removeSearchParam } from '../utils/router-utils';

export const useSelectedGame = () => {
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

export const useSelectedTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('tab');

  const setSelectedTab = useCallback((tabName) => {
    setSearchParams(addSearchParam('tab', tabName));
  }, [setSearchParams]);

  const clearSelectedTab = useCallback(() => {
    setSearchParams(removeSearchParam('tab'));
  }, [setSearchParams]);

  return { selectedTab, setSelectedTab, clearSelectedTab };
};
