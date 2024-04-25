'use client';

import { useState } from 'react';
import { Box, HStack, Flex } from '@chakra-ui/react';
import Form, { SubmitProps } from '@/components/systems/Form';
import GetColor from '@/app/_hooks/colorSelector';
import { SystemForm } from '@/app/_types/system';
import PageHeading from '../_components/utility/pageHeading';

const PageClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: SubmitProps) => {
    setIsLoading(true);

    let submitData: SystemForm = {
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
        <PageHeading heading="Systems" />
      </HStack>
      <Box
        borderWidth="2px"
        borderRadius="9px"
        borderColor={GetColor('border')}
        padding="1rem"
      >
        <Form onSubmitHandler={handleSubmit} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};

export default PageClient;
