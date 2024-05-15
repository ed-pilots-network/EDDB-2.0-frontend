import GetColor from '@/app/_hooks/colorSelector';
import { CheckboxGroup as ChakraCheckboxGroup, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const CheckboxGroup = ({ children }: PropsWithChildren<{}>) => (
  <Stack
    height={{ base: 'inherit', md: '40px', lg: '40px' }}
    borderWidth="1px"
    borderRadius="md"
    borderColor={GetColor('border')}
    padding={3}
    spacing={5}
    direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
  >
    <ChakraCheckboxGroup colorScheme="gray">{children}</ChakraCheckboxGroup>
  </Stack>
);

export default CheckboxGroup;
