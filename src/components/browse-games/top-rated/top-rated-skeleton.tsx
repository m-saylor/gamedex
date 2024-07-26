import React from 'react';
import {
  Card, Skeleton,
} from '@chakra-ui/react';
import { alternateCardColor } from '../../../utils/style-utils';

function TopRatedSkeleton() {
  const renderedSkeleton = Array.from(Array(10).keys()).map((_, index) => {
    return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        height="168px"
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        ml={40}
        mr={40}
        overflow="hidden"
        variant={alternateCardColor(index)}
      >
        <Skeleton height="100%" width="100%" />
      </Card>
    );
  });

  return renderedSkeleton;
}

export default TopRatedSkeleton;
