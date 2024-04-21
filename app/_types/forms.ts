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
  startSystem: string;
  startStation?: string;
  finishSystem?: string;
  maxHopCount?: number;
};

export type TradeRouteFilters = {
  commodities?: {
    value: string;
  }[];
  maxRouteDistance?: number;
  minSupply?: string;
  minDemand?: string;
  maxPriceAge?: number;
  cargoCapacity?: number;
  availableCredits?: number;
  landingPadSize?: string;
  maxArrivalDistance?: number;
  stationType?: string;
};
