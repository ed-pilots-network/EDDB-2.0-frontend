'use client';

import { useState } from 'react';
import { Box, HStack, Flex } from '@chakra-ui/react';
import Form, { SubmitProps } from '@/components/trade-routes/single/Form';
import GetColor from '@/app/_hooks/colorSelector';
import { SingleTradeRouteForm } from '@/app/_types/forms';
import { ICommodity } from '@/app/_types';
import PageHeading from '@/app/_components/utility/pageHeading';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient = ({ commodities }: IPageClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: SubmitProps) => {
    setIsLoading(true);

    let submitData: SingleTradeRouteForm = {
      ...data,
    };

    // TODO: format and submit data to backend
    setTimeout(() => {
      console.log('submitted ', submitData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Flex flexDirection="column" gap="24px" width="100%">
      <HStack spacing={4}>
        <PageHeading heading="Single Trade Route Finder" />
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
