import { Controller } from 'react-hook-form';
import {
  OptionBase,
  GroupBase,
  AsyncSelect,
  MultiValue,
} from 'chakra-react-select';
import SelectStyles from '@/app/_hooks/SelectStyles';
import { ISystem } from '@/app/_types/system';
import { ChangeEvent } from 'react';

interface Props {
  fieldName: string;
  control: any;
  isMulti?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLSelectElement> | MultiValue<SelectGroup>,
  ) => void;
}

interface SelectGroup extends OptionBase {
  label: string;
  value: string;
}

type FieldOptions = {
  isMulti?: true;
};

/* Swap out for live lookup when data is available? */
const getMockSystemName = async (lookupString: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_API_URL}/api/v1/exploration/system/by-name-containing`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: lookupString }),
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

const getSystemName = async (lookupString: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STAGING_API_URL}/api/v1/exploration/system/by-name-containing?subString=${lookupString}&amount=10`,
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

const loadOptions = async (inputValue: string): Promise<SelectGroup[] | []> => {
  if (inputValue.length < 3) {
    return [];
  }

  try {
    let res = [];

    if (process.env.NODE_ENV === 'development') {
      res = await getMockSystemName(inputValue);
    } else {
      res = await getSystemName(inputValue);
    }

    const returnArr: SelectGroup[] = res.map((item: ISystem) => ({
      value: item.eliteId,
      label: item.name,
    }));

    const returnArrFiltered = returnArr.filter((i: SelectGroup) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    return returnArrFiltered;
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error({ message: 'Failed fetching system name', error });
    return [];
  }
};

const SystemsField = ({
  fieldName,
  control,
  isMulti = false,
  placeholder = 'Select systems...',
  disabled = false,
  onChange,
}: Props) => {
  const fieldOptions: FieldOptions = {};
  if (isMulti) {
    fieldOptions.isMulti = true;
  }

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({
        field: { name, ref, value, onChange: internalOnChange, onBlur },
      }) => (
        <AsyncSelect<SelectGroup, true, GroupBase<SelectGroup>>
          cacheOptions
          isClearable
          loadingMessage={() => 'Searching...'}
          noOptionsMessage={(inputValue) =>
            inputValue.inputValue.length < 3
              ? 'Enter 3 or more characters'
              : 'No results found.'
          }
          id={`${fieldName}-field`}
          instanceId={`${fieldName}-field`}
          name={name}
          ref={ref}
          isDisabled={disabled}
          loadOptions={loadOptions}
          onChange={(e) => {
            internalOnChange(e);
            if (onChange) {
              onChange(e);
            }
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          chakraStyles={SelectStyles()}
          value={value}
          {...fieldOptions}
        />
      )}
    />
  );
};

export default SystemsField;
