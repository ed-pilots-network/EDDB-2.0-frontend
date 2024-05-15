import { UseFormRegister } from 'react-hook-form';
import CheckboxGroup from '@/app/_components/form/CheckboxGroup';
import Checkbox from '@/app/_components/form/Checkbox';

interface Props {
  register: UseFormRegister<any>;
}

export const checkboxValues = [
  { name: 'Orbital', value: 'includeOrbital', checked: true },
  { name: 'Planetary', value: 'includePlanetary' },
  { name: 'Odyssey', value: 'includeOdyssey' },
  { name: 'Carriers', value: 'includeFleetCarriers' },
];

const StationTypesField = ({ register }: Props) => (
  <CheckboxGroup>
    {checkboxValues.map((checkbox, index) => (
      <Checkbox
        key={index}
        label={checkbox.name}
        checked={checkbox.checked}
        register={register(`${checkbox.value}`)}
      />
    ))}
  </CheckboxGroup>
);

export default StationTypesField;
