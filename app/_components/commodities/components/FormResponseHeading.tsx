import React from 'react';

import { Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { ICommodityFormResponse } from '@/types/index';
import PageHeading from '../../utility/pageHeading';

interface IFormResponseHeadProps {
  commodityResponse: ICommodityFormResponse[];
  legendItems: {
    text: string;
    src: string;
    alt: string;
  }[];
}

const FormResponseHeading: React.FC<IFormResponseHeadProps> = ({
  commodityResponse,
  legendItems,
}) => {
  // Get the commodity display name from the first response
  const commodityDisplayName =
    commodityResponse[0]?.commodity.displayName ?? 'Unknown';

  return (
    <>
      <PageHeading heading={`Commodity: ${commodityDisplayName}`} />
      <HStack>
        <Heading as="h3" size="sm" hideBelow="md">
          Legend:
        </Heading>
        <Flex gap={4}>
          {legendItems.map((item, index) => (
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

export default FormResponseHeading;
