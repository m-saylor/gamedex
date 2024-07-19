import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IconButton, Input, useDisclosure, Popover,
  PopoverContent, PopoverAnchor, Flex,
  InputGroup, InputRightElement, Button,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
// import debounce from 'lodash.debounce';
import { useQuery } from '@tanstack/react-query';
import {
  selectGameAndLoadData, clearSearchResults,
  searchGames,
} from '../../actions';
// import { useSearchResultsPreview } from '../../hooks/redux-hooks';
import { useOnKeyDown, ENTER_KEY } from '../../hooks/event-hooks';
import { searchGamesPreviewFromIGDB } from '../../api/igdb';

function SearchBar({
  searchTerm, setSearchTerm,
}) {
  // state
  const [resultsCache, setResultsCache] = useState([]);

  // queries
  const resultsPreview = useQuery({ queryKey: ['searchResultsPreview', searchTerm], queryFn: () => searchGamesPreviewFromIGDB(searchTerm), enabled: searchTerm !== undefined });

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const resultsPreview = useSearchResultsPreview();

  // const handleSearchPreview = useCallback(() => {
  //   dispatch(searchGamesPreview(searchTerm));
  // }, [dispatch, searchTerm]);

  // // create a new debounced search function
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedSearch = useCallback(debounce(handleSearchPreview, 100), [handleSearchPreview]);

  const onSearchButtonClick = useCallback(() => {
    if (searchTerm.length > 0) { // only run if search exists
      // clear previous results
      dispatch(clearSearchResults());

      // dispatch new search
      dispatch(searchGames(searchTerm));
      navigate('/results');
      onClose();
    }
  }, [dispatch, navigate, onClose, searchTerm]);

  // also search games when the user presses enter
  const searchOnEnter = useOnKeyDown(onSearchButtonClick, ENTER_KEY);

  const onInputFocus = useCallback(() => {
    if (resultsCache && resultsCache.length > 0) {
      onOpen();
    }
  }, [onOpen, resultsCache]);

  // select game
  const onSelectGamePreview = useCallback((game) => {
    dispatch(selectGameAndLoadData(game));
  }, [dispatch]);

  // useEffect(() => {
  //   debouncedSearch();
  // }, [debouncedSearch]);

  useEffect(() => {
    // if we have results, open the popover, and update results cache
    if (resultsPreview && resultsPreview.length > 0) {
      setResultsCache(resultsPreview.data);
      onOpen();
      return;
    }

    // if the user has cleared the input, close the popover, and update results cache
    if (searchTerm?.length === 0) {
      setResultsCache(resultsPreview.data);
      onClose();
    }

    // otherwise, continue displaying the previous search results (stored in results cache)
  }, [onClose, onOpen, resultsPreview, searchTerm?.length]);

  return (
    <div className="search-bar">
      <Popover autoFocus={false} closeOnBlur isOpen={isOpen} matchWidth onClose={onClose}>
        <PopoverAnchor>
          <Flex alignItems="center" pl="0px" pr="0px">
            <InputGroup>
              <Input
                minWidth="230px"
                ml="15px"
                placeholder="Search for a game"
                size="sm"
                type="text"
                variant="outline"
                width="-moz-min-content"
                onBlur={onClose}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={onInputFocus}
                onKeyDown={searchOnEnter}
              />
              <InputRightElement h="100%">
                <IconButton
                  aria-label="Search database"
                  colorScheme="gray"
                  h="90%"
                  icon={<Search2Icon />}
                  size="sm"
                  variant="ghost"
                  onClick={onSearchButtonClick}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </PopoverAnchor>
        <PopoverContent
          borderRadius="0.125rem"
          maxH="250px"
          ml="15px"
          mt="-7px"
          overflowX="hidden"
          overflowY="scroll"
          width="230px"
        >
          {resultsCache?.map((result, idx) => {
            return (
              <Button
                borderRadius="0px"
                cursor="pointer"
                fontSize="13px"
                fontWeight={400}
                height="fit-content"
                justifyContent="flex-start"
                key={`${result.id}`}
                ml={0}
                paddingBottom="2px"
                paddingTop="2px"
                pl={0}
                textAlign="left"
                variant="outline"
                whiteSpace="break-spaces"
                width="230px"
                onClick={() => onSelectGamePreview(result)}
              >
                {result.name}
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchBar;
