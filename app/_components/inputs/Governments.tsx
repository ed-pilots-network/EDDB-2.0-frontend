import governments from '@/app/_lib/government-list';
import { UseFormRegisterReturn } from 'react-hook-form';
import Select from './form/Select';

interface Props {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const GovernmentsField = ({ register, placeholder }: Props) => (
  <Select placeholder={placeholder} register={register}>
    {governments.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </Select>
);

export default GovernmentsField;
