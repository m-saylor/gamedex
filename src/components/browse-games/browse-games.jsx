import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import JumpToTop from '../jump-to-top';
import TopRatedList from './top-rated/top-rated-list';
import TrendingGames from './trending/trending';
import { fetchTopRatedGames } from '../../api/igdb';
import { useSelectedTab } from '../../hooks/search-params-hooks';

function BrowseGames(props) {
  // preloads data for the top rated games tab
  const topRatedGames = useQuery({ queryKey: ['topRatedGames'], queryFn: fetchTopRatedGames });

  // sets the selected tab in the URL
  const { selectedTab, setSelectedTab } = useSelectedTab();

  // provides controlled tab functionality
  const activeIndex = props.options.findIndex((option) => option.active);
  const [tabIndex, setTabIndex] = useState(activeIndex);
  const handleTabsChange = (index) => {
    setTabIndex(index);
    setSelectedTab();
  };

  return (
    <div>
      <Tabs colorScheme="gray" index={tabIndex} variant="soft-rounded" onChange={handleTabsChange}>
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
