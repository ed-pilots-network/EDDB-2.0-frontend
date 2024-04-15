export type SystemForm = {
  systemId?: string;
  onlyPopulated?: boolean;
  allegiance?: string;
  government?: string;
  economy?: string;
  minorFaction?: string;
  stationFilter?: string;
  power?: string;
  powerEffect?: string;
  security?: string;
  factionState?: string;
  requiresPermit?: boolean;
};

export interface ISystem {
  name: string;
  coordinate: {
    x: number;
    y: number;
    z: number;
  };
  eliteId: number;
  primaryStarClass: string;
}
