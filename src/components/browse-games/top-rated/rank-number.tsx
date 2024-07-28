import React from 'react';
import { CardHeader, Heading } from '@chakra-ui/react';

interface RankNumberProps {
  index: number;
}

function RankNumber({ index }: RankNumberProps) {
  return (
    <CardHeader>
      <Heading
        alignItems="center"
        className="number-rankings"
        colorScheme="lightgray"
        display="flex"
        justifyContent="center"
        textAlign="center"
        variant="rankNumber"
        width={20}
      >
        {index + 1}
      </Heading>
    </CardHeader>
  );
}

export default RankNumber;
