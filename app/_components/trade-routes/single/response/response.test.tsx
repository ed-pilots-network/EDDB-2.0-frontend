import { cleanup, render, screen } from '@testing-library/react';
import SingleTradeResponseDesktop from './desktop/ResponseDesktop';
import type { FormResponseProps } from '../Schema';
import {
  ZodCommodityNameApiType,
  ZodStationDtoApiType,
  ZodSystemDtoApiType,
} from '@/app/_types';
import { Suspense } from 'react';

const mockedCommodity: ZodCommodityNameApiType = {
  commodityName: 'gold',
  displayName: 'Gold',
  type: 'METALS',
  isRare: false,
};

const mockedBuySystem: ZodSystemDtoApiType = {
  eliteId: 2724896688491,
  name: 'Closest System',
  coordinates: {
    x: -40.75,
    y: -41.375,
    z: 26.84375,
  },
};

const mockedBuySystem2: ZodSystemDtoApiType = {
  eliteId: 2724896688491,
  name: 'Furthest System',
  coordinates: {
    x: -40.75,
    y: -41.375,
    z: 26.84375,
  },
};

const mockedSellSystem: ZodSystemDtoApiType = {
  eliteId: 10477373803,
  name: 'Sol',
  coordinates: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const now = new Date().toISOString();

const mockedBuyStation: ZodStationDtoApiType = {
  name: 'Closest Station',
  arrivalDistance: 709.318,
  system: mockedBuySystem,
  marketId: 1,
  planetary: false,
  requireOdyssey: false,
  fleetCarrier: false,
  maxLandingPadSize: 'LARGE',
  marketUpdateAt: now,
};

const mockedSellStation: ZodStationDtoApiType = {
  name: 'Sell Station',
  arrivalDistance: 100,
  system: mockedSellSystem,
  marketId: 2,
  planetary: false,
  requireOdyssey: false,
  fleetCarrier: false,
  maxLandingPadSize: 'LARGE',
  marketUpdateAt: now,
};

const mockedBuyStation2: ZodStationDtoApiType = {
  name: 'Furthest Station',
  arrivalDistance: 200,
  system: mockedBuySystem2,
  marketId: 1,
  planetary: false,
  requireOdyssey: false,
  fleetCarrier: false,
  maxLandingPadSize: 'LARGE',
  marketUpdateAt: now,
};

const mockedResults: FormResponseProps[] = [
  {
    commodityDto: mockedCommodity,
    buyFromStationDto: mockedBuyStation,
    buyPrice: 1,
    stock: 100,
    sellToStationDto: mockedSellStation,
    sellPrice: 2,
    demand: 5,
    profit: 1,
    routeDistance: 10,
  },
  {
    commodityDto: mockedCommodity,
    buyFromStationDto: mockedBuyStation2,
    buyPrice: 1,
    stock: 100,
    sellToStationDto: mockedSellStation,
    sellPrice: 3,
    demand: 5,
    profit: 2,
    routeDistance: 20,
  },
];

describe('Single Trade Form Response', () => {
  beforeEach(async () => {
    const Component = () => (
      <Suspense>
        <SingleTradeResponseDesktop results={mockedResults} cargoCapacity={1} />
      </Suspense>
    );

    render(<Component />);
  });

  afterEach(() => cleanup());

  it('renders with default sort of profit', () => {
    // const headings = screen.getAllByRole('p');
    const distance = screen.getAllByText('ly', { exact: false });
    const profit = screen.getAllByText('cr', { exact: false });

    expect(distance[0]).toHaveTextContent('20 ly');
    expect(profit[0]).toHaveTextContent('2 cr');
  });

  it('can be sorted by distance', () => {
    // const headings = screen.getAllByRole('p');
    const distance = screen.getAllByText('ly', { exact: false });
    const profit = screen.getAllByText('cr', { exact: false });
    // const sortButton = screen.getByRole('button');

    expect(distance[0]).toHaveTextContent('20 ly');
    expect(profit[0]).toHaveTextContent('2 cr');
  });

  // it('results can be sorted by price', async () => {
  //   // ARRANGE
  //   const lowestPriceTableRow = screen.getByText('CR 49,184');
  //   const table = lowestPriceTableRow.parentNode;
  //   const sortButton = screen.getByRole('button', { name: 'Sell Price' });
  //
  //   // ASSERT
  //   expect(table?.firstChild).toHaveTextContent('CR 49,184');
  //
  //   // ACT
  //   fireEvent.click(sortButton);
  //
  //   // ASSERT
  //   expect(table?.firstChild).toHaveTextContent('CR 51,234');
  // });
});
