import type { IStation } from './celestial_objects';

export interface ICommodity {
  commodityName: string;
  displayName: string;
  type: string;
  isRare: boolean;
}

export interface ICommodityFormRequest {
  commodityDisplayName: {
    value: string;
  };
  maxLandingPadSize: string;
  minSupply: number;
  maxSupply: number;
  minDemand: number;
  maxDemand: number;
  system?: string;
  includeOrbital?: boolean;
  includePlanetary?: boolean;
  includeOdyssey?: boolean;
  includeFleetCarriers?: boolean;
}

export interface ICommodityFormResponse {
  commodity: ICommodity;
  station: IStation;
  priceUpdatedAt: string;
  supply: number;
  demand: number;
  buyPrice: number;
  sellPrice: number;
  distance: number;
}
