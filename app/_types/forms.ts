export type ShipForm = {
  buySystem?: string;
  buyStation?: string;
  sellSystem?: string;
  sellStation?: string;
};

export type SingleTradeRouteForm = TradeRouteFilters & {
  buySystem?: { value: number };
  buyStation?: string;
  sellSystem?: { value: number };
  sellStation?: string;
};

export type MultiTradeRouteForm = TradeRouteFilters & {
  startSystem?: string;
  startStation?: string;
  finishSystem?: string;
  maxHopCount?: string;
};

export type TradeRouteFilters = {
  commodities?: {
    value: string;
  }[];
  maxHopDistance?: string;
  minSupply?: string;
  minDemand?: string;
  maxPriceAge?: number;
  cargoCapacity?: number;
  availableCredits?: number;

  government?: string;
  allegiance?: string;
  requiresPermit?: boolean;
  landingPadSize?: string;
  maxDistanceToArrival?: string;
  stationType?: string;
  power?: string;
};
