import { UseFormRegisterReturn } from 'react-hook-form';
import { Checkbox as ChakraCheckbox, Text } from '@chakra-ui/react';

interface Props {
  register: UseFormRegisterReturn;
  label: string;
  checked?: boolean;
}

const Checkbox = ({ register, label, checked }: Props) => (
  <ChakraCheckbox {...register} defaultChecked={checked}>
    <Text fontSize="sm">{label}</Text>
  </ChakraCheckbox>
);

export default Checkbox;
