import GetColor from '@/app/_hooks/colorSelector';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Radio as ChakraRadio, Text } from '@chakra-ui/react';

interface Props {
  register: UseFormRegisterReturn;
  label: string;
  value: string;
  checked?: boolean;
}

const Radio = ({ register, label, value, checked }: Props) => (
  <ChakraRadio
    colorScheme="orange"
    {...register}
    borderColor={GetColor('border')}
    borderRadius={8}
    defaultChecked={checked}
    value={value}
  >
    <Text fontSize="sm">{label}</Text>
  </ChakraRadio>
);

export default Radio;
