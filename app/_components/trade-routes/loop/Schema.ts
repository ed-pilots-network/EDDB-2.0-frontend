import { z } from 'zod';
import { ZodCommodityNameApiConst, ZodStationDtoApiConst } from '@/app/_types';

export const FormSchema = z.object({
  referenceSystemName: z
    .object({ label: z.string(), value: z.number() })
    .optional()
    .nullable(),
  commodityDisplayNames: z
    .array(z.object({ value: z.string() }))
    .optional()
    .transform((val) => val?.map((v) => v.value)),
  maxPriceAgeHours: z
    .string()
    .optional()
    .transform((val) => Number(val) || 72),
  maxRouteDistance: z.number(),
  minSupply: z.number(),
  minDemand: z.number(),
  maxLandingPadSize: z.string().optional(),
  maxArrivalDistance: z.number(),
  includeFleetCarriers: z.boolean(),
  includeSurfaceStations: z.boolean(),
  includeOdyssey: z.boolean(),
});

// submit data will include reference system coords only, not name
export const FormSubmitSchema = FormSchema.omit({
  referenceSystemName: true,
}).extend({
  xCoordinate: z.number().optional(),
  yCoordinate: z.number().optional(),
  zCoordinate: z.number().optional(),
});

export type FormProps = z.infer<typeof FormSchema>;
export type FormSubmitProps = z.infer<typeof FormSubmitSchema>;

const TripProps = z.object({
  commodityDto: ZodCommodityNameApiConst,
  buyFromStationDto: ZodStationDtoApiConst,
  buyPrice: z.number(),
  stock: z.number(),
  sellToStationDto: ZodStationDtoApiConst,
  sellPrice: z.number(),
  demand: z.number(),
  profit: z.number(),
  routeDistance: z.number(),
});

const FormResponseSchema = z.object({
  firstTrip: TripProps,
  returnTrip: TripProps,
  distanceFromCommander: z.number(),
});

export type FormResponseProps = z.infer<typeof FormResponseSchema>;
