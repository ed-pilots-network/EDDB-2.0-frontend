export type CommodityTypeEnumApi =
  | 'CHEMICALS'
  | 'CONSUMER_ITEMS'
  | 'LEGAL_DRUGS'
  | 'FOODS'
  | 'INDUSTRIAL_MATERIALS'
  | 'MACHINERY'
  | 'MEDICINES'
  | 'METALS'
  | 'MINERALS'
  | 'SALVAGE'
  | 'SLAVES'
  | 'TECHNOLOGY'
  | 'TEXTILES'
  | 'WASTE'
  | 'WEAPONS';

export type LandingPadEnumApi = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface CommodityDtoApi {
  commodityName: string;
  displayName: string;
  type: CommodityTypeEnumApi;
  isRare: boolean;
}

export interface SystemDtoApi {
  eliteId: number;
  name: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

export interface StationDtoApi {
  name: string;
  arrivalDistance: number;
  system: SystemDtoApi;
  marketId: number;
  planetary: boolean;
  requireOdyssey: boolean;
  fleetCarrier: boolean;
  maxLandingPadSize: LandingPadEnumApi;
  marketUpdatedAt: string;
}

export interface SingleTradeAPIResponse {
  commodityDto: CommodityDtoApi;
  buyFromStationDto: StationDtoApi;
  buyPrice: number;
  stock: number;
  sellToStationDto: StationDtoApi;
  sellPrice: number;
  demand: number;
  profit: number;
  routeDistance: number;
}
