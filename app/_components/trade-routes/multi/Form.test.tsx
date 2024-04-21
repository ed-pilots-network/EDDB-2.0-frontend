import { render, screen } from '@testing-library/react';
import Form from './Form';
import { ChakraProvider } from '@chakra-ui/react';

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

    expect(
      screen.getByRole('combobox', { name: 'Start System' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Start Station (optional)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Finish System (optional)' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Commodities' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Cargo Capacity' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Route Distance' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Hop Count' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Min. Supply' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Min. Demand' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Available Credits' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Price Age' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Max Distance From Star' }),
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
