import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import StationTypes, { checkboxValues } from '../StationTypes';
import { SystemForm } from '@/app/_types/system';

describe('Station Type Field', () => {
  beforeEach(() => {
    const Component = () => {
      const { register } = useForm<SystemForm>();

      return <StationTypes register={register} />;
    };

    render(<Component />);
  });

  it('renders the 4 checkboxes and they work', () => {
    expect(screen.getAllByRole('checkbox').length).toEqual(4);

    checkboxValues.forEach((checkbox) => {
      let el = screen.getByLabelText(checkbox.name);
      expect(el).toBeInTheDocument();
    });
  });

  it('checks only Orbital Station by default', () => {
    expect(screen.getAllByRole('checkbox').length).toEqual(4);

    expect(checkboxValues[0].name === 'Orbital').toBeTruthy();

    expect(screen.getByLabelText(checkboxValues[0].name)).toBeChecked();
    expect(screen.getByLabelText(checkboxValues[1].name)).not.toBeChecked();
    expect(screen.getByLabelText(checkboxValues[2].name)).not.toBeChecked();
    expect(screen.getByLabelText(checkboxValues[3].name)).not.toBeChecked();
  });

  it('allows the checkboxes to be checked', () => {
    expect(screen.getAllByRole('checkbox').length).toEqual(4);

    // Check orbital can be unchecked
    let el = screen.getByLabelText(checkboxValues[0].name);
    fireEvent.click(el);
    expect(el).not.toBeChecked();

    // Check the rest can be checked
    [1, 2, 3].forEach((index) => {
      el = screen.getByLabelText(checkboxValues[index].name);
      fireEvent.click(el);
      expect(el).toBeChecked();
    });
  });
});
