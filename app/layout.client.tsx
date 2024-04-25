'use client';

import { ColorModeScript, Box, Flex } from '@chakra-ui/react';
import Navbar from './_components/navbar/Navbar';
import Footer from './_components/footer/Footer';
import GetColor from '@/app/_hooks/colorSelector';
import theme from './_config/theme';
import layoutConfig from './_config/layout';
import { rubik } from './_config/theme/fonts';

const LayoutClient = ({ children }: { children: React.ReactNode }) => (
  <>
    {/* ColorModeScript mitigates the FOUC for dark theme being default */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Flex
      bg={GetColor('background')}
      color={GetColor('text')}
      direction="column"
      minH="100vh"
      className={rubik.className}
    >
      <Navbar />
      <Box as="main" flex="1">
        <Flex p={5} justify="center">
          <Flex width="100%" maxWidth={layoutConfig.maxWidth}>
            {children}
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  </>
);

export default LayoutClient;
