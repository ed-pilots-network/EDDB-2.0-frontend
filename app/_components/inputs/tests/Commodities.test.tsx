import { act, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ChakraProvider, FormControl, FormLabel } from '@chakra-ui/react';
import selectEvent from 'react-select-event';
import CommoditiesField from '../Commodities';
import { StationForm } from '@/app/_types/station';

const MOCK_COMMODITIES = [
  {
    commodityName: 'Agronomic Treatment',
    displayName: 'Agronomic Treatment',
    type: 'Consumables',
    isRare: false,
  },
  {
    commodityName: 'Trillium',
    displayName: 'Trillium',
    type: 'Consumables',
    isRare: false,
  },
  {
    commodityName: 'Gold',
    displayName: 'Gold',
    type: 'Consumables',
    isRare: false,
  },
];

const Component = ({ isMulti = false }: { isMulti?: boolean }) => {
  const { control } = useForm<StationForm>();

  return (
    <ChakraProvider>
      <CommoditiesField
        control={control}
        isMulti={isMulti}
        commodities={MOCK_COMMODITIES}
      />
    </ChakraProvider>
  );
};

describe('Commodities Field', () => {
  it('renders', () => {
    render(<Component />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('loads with the provided options', () => {
    render(
      <form data-testid="form">
        <label htmlFor="commodities">Commodity</label>
        <Component />
      </form>,
    );

    const selectElement = screen.getByRole('combobox');

    expect(screen.queryByText('Gold')).toBeNull();

    act(() => {
      selectEvent.openMenu(selectElement);
    });

    MOCK_COMMODITIES.forEach((item) => {
      expect(screen.queryByText(item.displayName)).toBeInTheDocument();
    });
  });

  it('allows single select by default', async () => {
    const { getByTestId, getByLabelText } = render(
      <form data-testid="form">
        <FormControl>
          <FormLabel>Commodities</FormLabel>
          <Component />
        </FormControl>
      </form>,
    );

    const selectElement = getByLabelText('Commodities');

    expect(getByTestId('form')).toHaveFormValues({});

    act(() => {
      selectEvent.openMenu(selectElement);
    });

    // Select item
    await act(async () => {
      await selectEvent.select(selectElement, 'Trillium');
    });

    // Check item is selected
    expect(getByTestId('form')).toHaveFormValues({
      commodityDisplayNames: 'Trillium',
    });

    act(() => {
      selectEvent.openMenu(selectElement);
    });

    // Select item
    await act(async () => {
      await selectEvent.select(selectElement, 'Gold');
    });

    // Check both items are selected
    expect(getByTestId('form')).toHaveFormValues({
      commodityDisplayNames: 'Gold',
    });
  });

  it('allows multi select when enabled', async () => {
    const { getByTestId, getByLabelText } = render(
      <form data-testid="form">
        <FormControl>
          <FormLabel>Commodities</FormLabel>
          <Component isMulti={true} />
        </FormControl>
      </form>,
    );

    const selectElement = getByLabelText('Commodities');

    expect(getByTestId('form')).toHaveFormValues({});

    act(() => {
      selectEvent.openMenu(selectElement);
    });

    // Select item
    await act(async () => {
      await selectEvent.select(selectElement, 'Trillium');
    });

    // Check item is selected
    expect(getByTestId('form')).toHaveFormValues({
      commodityDisplayNames: 'Trillium',
    });

    act(() => {
      selectEvent.openMenu(selectElement);
    });

    // Select item
    await act(async () => {
      await selectEvent.select(selectElement, 'Gold');
    });

    // Check both items are selected
    expect(getByTestId('form')).toHaveFormValues({
      commodityDisplayNames: ['Trillium', 'Gold'],
    });
  });
});
