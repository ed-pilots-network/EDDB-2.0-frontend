import { act, render, screen } from '@testing-library/react';
import Form from './Form';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../../inputs/Systems', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue(
      <input value="some value" onChange={(e) => e.target.value} />,
    ),
}));
jest.mock('../../inputs/LandingPads', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue(
      <input
        aria-label="landingPads"
        value="some value"
        onChange={(e) => e.target.value}
      />,
    ),
}));
jest.mock('../../inputs/StationTypes', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue(
      <input
        aria-label="stationTypes"
        value="some value"
        onChange={(e) => e.target.value}
      />,
    ),
}));

describe('Stations Form', () => {
  it('renders the fields', () => {
    render(
      <ChakraProvider>
        <Form onSubmitHandler={() => {}} isLoading={false} commodities={null} />
      </ChakraProvider>,
    );

    // filter button hides fields at start
    expect(
      screen.queryByRole('combobox', { name: 'Commodities' }),
    ).not.toBeInTheDocument();

    const filtersButton = screen.getByRole('button', { name: 'Options' });

    expect(filtersButton).toBeInTheDocument();

    // @ts-ignore depecated warning relates to PR https://github.com/testing-library/react-testing-library/pull/1319
    act(() => {
      filtersButton.click();
    });

    expect(
      screen.getByRole('combobox', { name: 'Buy from Station' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Sell to Station' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Route Distance - LY' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Cargo Capacity' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Available Credits' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Max Price Age' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Distance From Star - LS' }),
    ).toBeInTheDocument();

    /* Mocked abstracted fields */
    expect(
      screen.getByRole('textbox', { name: 'landingPads' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: 'stationTypes' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Find Routes/i }),
    ).toBeInTheDocument();
  });
});
