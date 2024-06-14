import React from 'react';

import { VStack } from '@chakra-ui/react';
import ResponseLegend from '../Legend';
import ResponseBody from './BodyMobile';
import type { FormResponseProps } from '../../Schema';

const SingleTradeResponseMobile = ({
  results,
  cargoCapacity,
}: {
  results: FormResponseProps[];
  cargoCapacity: number;
}) => (
  <VStack width="100%" marginX="auto" opacity={0.9} paddingY={4}>
    <ResponseLegend />
    {results
      .sort((a: FormResponseProps, b: FormResponseProps) => b.profit - a.profit)
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

export default SingleTradeResponseMobile;
