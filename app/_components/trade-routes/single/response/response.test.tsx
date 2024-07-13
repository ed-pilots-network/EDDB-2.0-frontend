import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SingleTradeResponseDesktop from './desktop/ResponseDesktop';
import SingleTradeResponseMobile from './mobile/ResponseMobile';
import type { FormResponseProps } from '../Schema';
import {
  ZodCommodityNameApiType,
  ZodStationDtoApiType,
  ZodSystemDtoApiType,
} from '@/app/_types';

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

describe('Single Trade Form Response Desktop', () => {
  beforeEach(async () => {
    const Component = () => (
      <SingleTradeResponseDesktop results={mockedResults} cargoCapacity={1} />
    );

    render(<Component />);
  });

  afterEach(() => cleanup());

  it('renders with default sort of profit', () => {
    const distance = screen.getAllByText('ly', { exact: false });
    const profit = screen.getAllByText('cr', { exact: false });

    expect(distance[0]).toHaveTextContent('20 ly');
    expect(profit[0]).toHaveTextContent('2 cr');
  });

  it('results can be sorted by distance', async () => {
    // ARRANGE
    const distance = screen.getAllByText('ly', { exact: false });
    const sortButton = screen.getByRole('button', { name: 'Distance' });

    // ASSERT
    expect(distance[0]).toHaveTextContent('20 ly');

    // ACT
    fireEvent.click(sortButton);

    // ASSERT
    expect(distance[0]).toHaveTextContent('10 ly');
  });

  it('results can be expanded', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];

    // ACT
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const firstCardElement = screen.getByText('Profit Per:', { exact: false });
    expect(firstCardElement).toBeInTheDocument();

    // ACT
    fireEvent.click(firstItemExpandButton);
    expect(firstCardElement).not.toBeInTheDocument();
  });

  it('expanded results card shows proper data', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];

    // ASSERT
    expect(firstItemExpandButton).toBeInTheDocument();

    // ACT
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const renderTotalProfit = screen.getAllByText('cr', { exact: false });
    expect(renderTotalProfit[0]).toHaveTextContent('2 cr');

    const renderTotalSupply = screen.getAllByText('units', { exact: false });
    expect(renderTotalSupply[0]).toHaveTextContent('100 units');
  });

  it('results card updates on sorting change', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];
    const sortButton = screen.getByRole('button', { name: 'Distance' });

    // ACT
    fireEvent.click(sortButton);
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const renderTotalProfit = screen.getAllByText('cr', { exact: false });
    expect(renderTotalProfit[0]).toHaveTextContent('1 cr');

    const renderTotalSupply = screen.getAllByText('units', { exact: false });
    expect(renderTotalSupply[0]).toHaveTextContent('100 units');
  });
});

describe('Single Trade Form Response Mobile', () => {
  beforeEach(async () => {
    const Component = () => (
      <SingleTradeResponseMobile results={mockedResults} cargoCapacity={1} />
    );

    render(<Component />);
  });

  afterEach(() => cleanup());

  it('renders with default sort of profit', () => {
    const distance = screen.getAllByText('ly', { exact: false });
    const profit = screen.getAllByText('cr', { exact: false });

    expect(distance[0]).toHaveTextContent('20 ly');
    expect(profit[0]).toHaveTextContent('2 cr');
  });

  it('results can be sorted by distance', async () => {
    // ARRANGE
    const distance = screen.getAllByText('ly', { exact: false });
    const sortButton = screen.getByRole('button', { name: 'Distance' });

    // ASSERT
    expect(distance[0]).toHaveTextContent('20 ly');

    // ACT
    fireEvent.click(sortButton);

    // ASSERT
    expect(distance[0]).toHaveTextContent('10 ly');
  });

  it('results can be expanded', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];

    // ACT
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const firstCardElement = screen.getByText('Profit Per:', { exact: false });
    expect(firstCardElement).toBeInTheDocument();

    // ACT
    fireEvent.click(firstItemExpandButton);
    expect(firstCardElement).not.toBeInTheDocument();
  });

  it('expanded results card shows proper data', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];

    // ASSERT
    expect(firstItemExpandButton).toBeInTheDocument();

    // ACT
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const renderTotalProfit = screen.getAllByText('cr', { exact: false });
    expect(renderTotalProfit[0]).toHaveTextContent('2 cr');

    const renderTotalSupply = screen.getAllByText('units', { exact: false });
    expect(renderTotalSupply[0]).toHaveTextContent('100 units');
  });

  it('results card updates on sorting change', async () => {
    const expandButtons = screen.getAllByTitle('expand');
    const firstItemExpandButton = expandButtons[0];
    const sortButton = screen.getByRole('button', { name: 'Distance' });

    // ACT
    fireEvent.click(sortButton);
    fireEvent.click(firstItemExpandButton);

    // ASSERT
    const renderTotalProfit = screen.getAllByText('cr', { exact: false });
    expect(renderTotalProfit[0]).toHaveTextContent('1 cr');

    const renderTotalSupply = screen.getAllByText('units', { exact: false });
    expect(renderTotalSupply[0]).toHaveTextContent('100 units');
  });
});
