import GetColor from '@/app/_hooks/colorSelector';
import { RadioGroup as ChackraRadioGroup, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const RadioGroup = ({ children }: PropsWithChildren<{}>) => (
  <ChackraRadioGroup colorScheme="gray">
    <Stack
      height={{ base: 'inherit', md: '45px', lg: '45px' }}
      borderWidth="1px"
      borderRadius="md"
      borderColor={GetColor('border')}
      padding={3}
      spacing={5}
      direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
    >
      {children}
    </Stack>
  </ChackraRadioGroup>
);

export default RadioGroup;
