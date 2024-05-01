import React from 'react';
import {
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Center,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import useColorMode from '@/app/_hooks/useColorMode';
import GetColor from '@/app/_hooks/colorSelector';
import ModuleProps, { Module, Tags } from '../../_lib/moduleProps';

const ModuleLaunchPad = () => {
  const { isDark } = useColorMode();

  // local functions
  // NOTE: these hex values are a hack to get the dark.box to work
  // Chackra UI is not applying the theme variables with alpha: aslink87
  const cardBgColor = isDark ? 'rgb(30 31 34 / 0.7)' : 'rgb(255 255 255 / 0.7)';

  const filteredGrid = (filter: String) => (
    <SimpleGrid columns={[1, 1, 3]} spacing="50px">
      {ModuleProps.filter(
        (module: Module) => module.tag.toLowerCase() === filter,
      ).map((module) => (
        <LinkBox
          key={module.title}
          borderWidth="1px"
          borderRadius="9px"
          borderColor={GetColor('border-accent')}
          bgColor={cardBgColor}
          p="25px"
          position="relative"
          _hover={{
            boxShadow: 'lg',
            backdropFilter: 'auto',
            backdropContrast: '90%',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="10px"
            letterSpacing="2px"
          >
            <Icon as={FontAwesomeIcon} icon={module.icon} />
            <LinkOverlay as={NextLink} href={module.url} ml="10px">
              <Heading as="h2" size="sm">
                {module.title}
              </Heading>
            </LinkOverlay>
          </Box>
          <Text>{module.description}</Text>
        </LinkBox>
      ))}
    </SimpleGrid>
  );

  const renderTab = (text: string) => (
    <Tab
      _selected={{
        color: GetColor('textSelected'),
        borderBottom: '2px solid',
      }}
      aria-label={`Toggle ${text} Tab`}
      textTransform="capitalize"
      key={text}
    >
      {text}
    </Tab>
  );

  const renderTabPanel = (img: string, filter: string) => (
    <TabPanel>
      <Box as="div">
        <Center
          height="500px"
          position="fixed"
          width="100%"
          left="0"
          backgroundImage={`url(${img})`}
          backgroundSize="contain"
          opacity="0.2"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
        ></Center>
        {filteredGrid(filter)}
      </Box>
    </TabPanel>
  );

  // render export
  return (
    <Tabs
      position="relative"
      align="center"
      minHeight="100%"
      colorScheme={GetColor('text')}
    >
      <TabList display="flex" gap="2rem" flexWrap="wrap">
        {Tags.map((tag) => renderTab(tag))}
      </TabList>
      <TabPanels mt="20px" minHeight="400px">
        {renderTabPanel('/assets/Asp_Explorer.svg', 'discover')}
        {renderTabPanel('/assets/Type_9.svg', 'trade')}
        {renderTabPanel('/assets/Alliance_Crusader.svg', 'outfit')}
      </TabPanels>
    </Tabs>
  );
};

export default ModuleLaunchPad;
