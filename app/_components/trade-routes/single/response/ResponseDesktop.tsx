import React, { useState } from 'react';

import { Text, VStack } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import ResponseLegend from './Legend';
import ResponseHeadings from './Headings';
import ResponseBody from './Body';
import { compareNumbers } from '@/components/utility/common-functions';
import type { FormResponseProps } from '../Schema';

const SingleTradeResponseDesktop = ({
  results,
  cargoCapacity,
}: {
  results: FormResponseProps[];
  cargoCapacity: number;
}) => {
  const [filter, setFilter] = useState('profit' as keyof FormResponseProps);
  const [ascending, setAscending] = useState(true);

  return (
    <VStack
      width="100%"
      marginX="auto"
      opacity={0.9}
      borderWidth="2px"
      borderRadius="9px"
      borderColor={GetColor('border')}
      bg={GetColor('')}
      padding="1rem"
    >
      <Text>Desktop Response</Text>
      <ResponseLegend />
      <ResponseHeadings
        filter={filter}
        setFilter={setFilter}
        ascending={ascending}
        setAscending={setAscending}
      />
      {results.length > 0 &&
        results
          .sort((a: FormResponseProps, b: FormResponseProps) =>
            compareNumbers(
              a[filter as keyof typeof a] as number,
              b[filter as keyof typeof a] as number,
              filter,
              ascending,
            ),
          )
          .map((result, index) => (
            <ResponseBody
              key={index}
              data={result}
              cargoCapacity={cargoCapacity}
            />
          ))}
    </VStack>
  );
};

export default SingleTradeResponseDesktop;
