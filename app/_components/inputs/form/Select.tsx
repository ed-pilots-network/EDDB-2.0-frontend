import { Select as ChakraSelect } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type DefaultEnum = string | number;

interface Props {
  children: ReactNode;
  defaultValue?: DefaultEnum;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  disabled?: boolean;
}

const Select = ({
  children,
  register,
  defaultValue,
  placeholder = 'Select...',
}: Props) => (
  <ChakraSelect
    defaultValue={defaultValue}
    {...register}
    placeholder={placeholder}
    variant="outline"
  >
    {children}
  </ChakraSelect>
);

export default Select;
