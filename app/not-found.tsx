'use client';

import NextLink from 'next/link';
import { Button, Center, Flex } from '@chakra-ui/react';
import layoutConfig from './_config/layout';
import PageHeading from './_components/utility/pageHeading';

export default function NotFound() {
  return (
    <Center width="100%">
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="24px"
        maxWidth={layoutConfig.maxWidth}
      >
        <PageHeading heading="404 - Page Not Found" />
        <NextLink href="/" passHref>
          <Button type="button" variant="outline">
            Go back Home
          </Button>
        </NextLink>
      </Flex>
    </Center>
  );
}
