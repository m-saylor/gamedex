import React, { useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import JumpToTop from '../jump-to-top.tsx';
import TopRatedList from './top-rated/top-rated-list.tsx';
import TrendingGames from './trending/trending.tsx';
import { fetchTopRatedGames } from '../../api/igdb.ts';
import { useSelectedTab } from '../../hooks/search-params-hooks';
import { TabName, browseTabNameToIndex, browseTabNames } from '../../utils/tab-utils.ts';

function BrowseGames() {
  // preloads data for the top rated games tab
  const topRatedGames = useQuery({ queryKey: ['topRatedGames'], queryFn: fetchTopRatedGames });

  // sets the selected tab in the URL
  const { selectedTab, setSelectedTab } = useSelectedTab();

  // provides controlled tab functionality
  const [tabIndex, setTabIndex] = useState<number>(selectedTab ? browseTabNameToIndex[selectedTab as TabName] : 0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    setSelectedTab(browseTabNames[index]);
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
