'use client';

import React, { useState } from 'react';
import { Box, Flex, HStack } from '@chakra-ui/react';
import Form, { SubmitProps } from '@/components/stations/Form';
import GetColor from '@/app/_hooks/colorSelector';
import { StationForm } from '@/app/_types/station';
import { ICommodity } from '@/app/_types/commodity';
import PageHeading from '../_components/utility/pageHeading';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient: React.FC<IPageClientProps> = ({ commodities }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: SubmitProps) => {
    setIsLoading(true);

    let submitData: StationForm = {
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
        <PageHeading heading="Stations" />
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
