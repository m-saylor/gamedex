import React from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import JumpToTop from '../jump-to-top';
import TopRatedList from './top-rated/top-rated-list';
import { useTopRated } from '../../hooks/redux-hooks';
import TrendingGames from './trending/trending';

function BrowseGames(props) {
  // hooks
  const topRated = useTopRated(); // fetch the top 100 rated games

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
            <TopRatedList gamesData={topRated} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <JumpToTop />
    </div>
  );
}

export default BrowseGames;
