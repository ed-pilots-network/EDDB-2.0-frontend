import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Select as ChakraSelect } from 'chakra-react-select';
import SelectStyles from '@/app/_hooks/SelectStyles';

interface Props {
  fieldName: string;
  options: string[];
  control: any;
  placeholder: string;
}

// consumes an array of strings {options} and outputs a styled selection component with search functionality
const ChakraReactSelect = ({
  fieldName,
  options,
  control,
  placeholder,
}: Props) => {
  const [optionsState, setOptionsState] = useState<
    { label: string; value: string }[]
  >([]);

  const formatOptions = () =>
    options.map((val) => ({
      label: val,
      value: val,
    }));

  useEffect(() => {
    setOptionsState(formatOptions());
  }, [options]);

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <ChakraSelect
          isClearable
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          options={optionsState}
          placeholder={placeholder}
          value={value}
          chakraStyles={SelectStyles()}
        />
      )}
    />
  );
};

export default ChakraReactSelect;
