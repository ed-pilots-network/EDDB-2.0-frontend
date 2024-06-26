import React from 'react';

import { Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import {
  legendItems,
  legendItemsDark,
} from '../../../utility/common-components';
import useColorMode from '@/app/_hooks/useColorMode';
import PageHeading from '../../../utility/pageHeading';

const ResponseLegend = () => {
  const { isDark } = useColorMode();
  return (
    <>
      <PageHeading heading="Top Trades" />
      <HStack>
        <Heading as="h3" size="sm" hideBelow="md">
          Legend:
        </Heading>
        <Flex gap={4}>
          {isDark
            ? legendItems.map((item, index) => (
                <VStack key={index} width="fit-content">
                  <Text size="xs">{item.text}:</Text>
                  <Image src={item.src} alt={item.alt} boxSize="20px" />
                </VStack>
              ))
            : legendItemsDark.map((item, index) => (
                <VStack key={index} width="fit-content">
                  <Text size="xs">{item.text}:</Text>
                  <Image src={item.src} alt={item.alt} boxSize="20px" />
                </VStack>
              ))}
        </Flex>
      </HStack>
    </>
  );
};

export default ResponseLegend;
