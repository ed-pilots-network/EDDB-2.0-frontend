import { z } from 'zod';
import { ZodLandingPadEnumConst } from './zod-common';
import { ZodSystemDtoApiConst } from './zod-system';

export const ZodStationDtoApiConst = z.object({
  name: z.string(),
  arrivalDistance: z.number(),
  system: ZodSystemDtoApiConst,
  marketId: z.number(),
  planetary: z.boolean(),
  requireOdyssey: z.boolean(),
  fleetCarrier: z.boolean(),
  maxLandingPadSize: ZodLandingPadEnumConst,
  marketUpdatedAt: z.string(),
});

export type ZodStationDtoApiType = z.infer<typeof ZodStationDtoApiConst>;
