'use client';

import { useState } from 'react';
import { Box, HStack, Heading, Flex } from '@chakra-ui/react';
import Form, { SubmitProps } from '@/components/trade-routes/multi/Form';
import GetColor from '@/app/_hooks/colorSelector';
import { MultiTradeRouteForm } from '@/app/_types/forms';
import { ICommodity } from '@/app/_types';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient = ({ commodities }: IPageClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: SubmitProps) => {
    setIsLoading(true);

    let submitData: MultiTradeRouteForm = {
      ...data,
    };

    // TODO: submit data to backend
    setTimeout(() => {
      console.log('submitted ', submitData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Flex flexDirection="column" gap="24px" width="100%">
      <HStack spacing={4}>
        <Box alignSelf="baseline">
          <Heading
            as="h1"
            size={{ base: 'md', md: 'lg', lg: 'lg' }}
            marginX={{ base: 'auto', md: '0', lg: '0' }}
            color={GetColor('accent-text')}
          >
            Multi Hop Trade Route Finder
          </Heading>
        </Box>
      </HStack>
      <Box
        borderWidth="2px"
        borderRadius="9px"
        borderColor={GetColor('border')}
        padding="1rem"
      >
        <Form
          onSubmitHandler={handleSubmit}
          isLoading={isLoading}
          commodities={commodities}
        />
      </Box>
    </Flex>
  );
};

export default PageClient;
