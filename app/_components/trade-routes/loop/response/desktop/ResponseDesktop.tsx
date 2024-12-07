import React, { useState } from 'react';

import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import ResponseLegend from '../Legend';
import ResponseBody from './BodyDesktop';
import type { FormResponseProps } from '../../Schema';

const LoopTradeResponseDesktop = ({
  results,
  cargoCapacity,
}: {
  results: FormResponseProps[];
  cargoCapacity: number;
}) => {
  const [filterValue, setFilterValue] = useState<'profit' | 'routeDistance'>(
    'profit',
  );
  return (
    <VStack
      width="100%"
      marginX="auto"
      opacity={0.9}
      borderWidth="2px"
      borderRadius="9px"
      borderColor={GetColor('border')}
      padding="1rem"
    >
      <ResponseLegend />
      <Text marginTop={2}>Sort by:</Text>
      <HStack>
        <Button
          onClick={() => setFilterValue('profit')}
          variant={filterValue !== 'profit' ? 'colorless' : 'outline'}
        >
          Profit
        </Button>
        <Button
          onClick={() => setFilterValue('routeDistance')}
          variant={filterValue !== 'routeDistance' ? 'colorless' : 'outline'}
        >
          Distance
        </Button>
      </HStack>
      {results
        // .sort((a: FormResponseProps, b: FormResponseProps) => {
        //   if (filterValue === 'profit') return b[filterValue] - a[filterValue];
        //   return a[filterValue] - b[filterValue];
        // })
        .map((result, index) => (
          <ResponseBody
            key={index}
            index={index}
            data={result}
            cargoCapacity={cargoCapacity}
          />
        ))}
    </VStack>
  );
};

export default LoopTradeResponseDesktop;
