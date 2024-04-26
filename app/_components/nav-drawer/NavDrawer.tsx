import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Flex,
  Link,
  LinkBox,
  Box,
  LinkOverlay,
  Divider,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import GetColor from '@/app/_hooks/colorSelector';
import { HamburgerIcon } from '@chakra-ui/icons';
import ModuleProps, { Module, Tags } from '@/app/_lib/moduleProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeading from '../utility/pageHeading';

const NavDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  // Close the drawer if the screen resizes above the md breakpoint
  const hideDrawer = !useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    if (isOpen && hideDrawer) {
      onClose();
    }
  }, [hideDrawer, isOpen]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Open Navigation Drawer"
        icon={<HamburgerIcon />}
        marginEnd={4}
        role="button"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={GetColor('textLight')} />
          <DrawerHeader
            backgroundColor={GetColor('box')}
            color={GetColor('textLight')}
          >
            <Flex alignItems="center" justifyContent="center">
              <Link href="/">
                <Image
                  src={'/EDPN_logo_spelled_nav_drawer.png'}
                  objectFit="cover"
                  alt="Logo"
                />
              </Link>
            </Flex>
          </DrawerHeader>

          <DrawerBody
            backgroundColor={GetColor('box')}
            color={GetColor('textLight')}
          >
            <Divider opacity="1.0" marginBottom={8}></Divider>
            {Tags.map((tag) => (
              <Box key={tag}>
                <PageHeading heading={tag} />
                <Box marginBottom={6}>
                  {ModuleProps.filter(
                    (module: Module) => module.tag === tag,
                  ).map((module) => (
                    <LinkBox
                      borderRadius="lg"
                      padding={2}
                      key={module.title}
                      _hover={{
                        backgroundColor: GetColor('background'),
                        color: GetColor('text'),
                      }}
                    >
                      <Icon as={FontAwesomeIcon} icon={module.icon} />
                      <LinkOverlay href={module.url} marginLeft={2}>
                        {module.title}
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </Box>
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
