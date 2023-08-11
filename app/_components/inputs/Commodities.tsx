import { Controller } from 'react-hook-form';
import { Select, OptionBase, GroupBase } from 'chakra-react-select';
import SelectStyles from '@/app/_hooks/SelectStyles';
import commodities from '@/app/_lib/commodity-list';

interface Props {
  control: any;
  isMulti?: boolean;
  placeholder?: string;
}

interface SelectGroup extends OptionBase {
  label: string;
  value: string;
}

type FieldOptions = {
  isMulti?: true;
};

/* Swap out for live lookup when data is available? */
const getOptions = () => {
  // TODO: for now these values have leading designators that we need to remove
  // for example: 'water' is stored as 'ch_water' designated as a chemical
  // if we don't end up using this designation then we should remove it
  const options: SelectGroup[] = commodities.map((commodity) => ({
    value: commodity.slice(3).split('_').join(' '),
    label: commodity.slice(3).split('_').join(' '),
  }));

  return options;
};

const CommoditiesField = ({
  control,
  isMulti = true,
  placeholder = 'Select a commodity...',
}: Props) => {
  const fieldOptions: FieldOptions = {};
  if (isMulti) {
    fieldOptions.isMulti = true;
  }
  return (
    <Controller
      name="commodityId"
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Select<SelectGroup, true, GroupBase<SelectGroup>>
          id="commodityId-field"
          instanceId="commodityId-field"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          options={getOptions()}
          placeholder={placeholder}
          chakraStyles={SelectStyles()}
          {...fieldOptions}
        />
      )}
    />
  );
};

export default CommoditiesField;
