'use client';

import { Button, Center, Flex, Text } from '@chakra-ui/react';
import layoutConfig from './_config/layout';
import PageHeading from './_components/utility/pageHeading';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Center width="100%">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="24px"
        maxWidth={layoutConfig.maxWidth}
      >
        <PageHeading heading="Something went wrong!" />
        <Text as="samp">{error.message}</Text>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Try again
        </Button>
      </Flex>
    </Center>
  );
}
