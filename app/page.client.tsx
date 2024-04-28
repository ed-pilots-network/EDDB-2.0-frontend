'use client';

import { Box, Center, Flex } from '@chakra-ui/react';
import ModuleLaunchPad from './_components/module-launch-pad/ModuleLaunchPad';
import layoutConfig from './_config/layout';
import PageHeading from './_components/utility/pageHeading';

const PageClient = () => (
  <Box flex="1" as="main" paddingX={2}>
    <Center maxWidth={layoutConfig.maxWidth} marginX="auto" p={5}>
      <Flex flexDirection="column" gap="24px" width="100%">
        <PageHeading heading="Elite Dangerous Pilots Network" />
        <ModuleLaunchPad />
      </Flex>
    </Center>
  </Box>
);

export default PageClient;
