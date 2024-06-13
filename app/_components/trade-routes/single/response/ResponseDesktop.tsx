import React from 'react';

import { VStack } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import ResponseLegend from './Legend';
import ResponseBody from './Body';
import type { FormResponseProps } from '../Schema';

const SingleTradeResponseDesktop = ({
  results,
  cargoCapacity,
}: {
  results: FormResponseProps[];
  cargoCapacity: number;
}) => (
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
    {results.length > 0 && (
      <VStack width="100%">
        {results
          .sort(
            (a: FormResponseProps, b: FormResponseProps) => b.profit - a.profit,
          )
          .map((result, index) => (
            <ResponseBody
              key={index}
              index={index}
              data={result}
              cargoCapacity={cargoCapacity}
            />
          ))}
      </VStack>
    )}
  </VStack>
);

export default SingleTradeResponseDesktop;
