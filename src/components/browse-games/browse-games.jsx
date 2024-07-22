import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import JumpToTop from '../jump-to-top';
import TopRatedList from './top-rated/top-rated-list';
import TrendingGames from './trending/trending';
import { fetchTopRatedGames } from '../../api/igdb';

function BrowseGames(props) {
  const topRatedGames = useQuery({ queryKey: ['topRatedGames'], queryFn: fetchTopRatedGames });

  return (
    <div>
      <Tabs colorScheme="gray" variant="soft-rounded">
        <TabList display="flex" justifyContent="center" margin={10}>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TRENDING</Tab>
          <Tab cursor="pointer" fontSize={13.5} fontWeight={700}>TOP RATED</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TrendingGames />
          </TabPanel>
          <TabPanel>
            <TopRatedList topRatedGames={topRatedGames} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </div>
  );
}

export default BrowseGames;
