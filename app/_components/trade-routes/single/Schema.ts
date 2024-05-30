import { z } from 'zod';
import { ZodCommodityNameApiConst, ZodStationDtoApiConst } from '@/app/_types';

export const FormSubmitSchema = z.object({
  buyFromSystemName: z
    .object({ label: z.string(), value: z.number() })
    .optional()
    .nullable(),
  buyFromStationName: z
    .object({ label: z.string(), value: z.string() })
    .optional()
    .nullable()
    .transform((val) => val?.value),
  sellToSystemName: z
    .object({ label: z.string(), value: z.number() })
    .optional()
    .nullable(),
  sellToStationName: z
    .object({ label: z.string(), value: z.string() })
    .optional()
    .nullable()
    .transform((val) => val?.value),
  commodityDisplayNames: z
    .array(z.object({ value: z.string() }))
    .optional()
    .transform((val) => val?.map((v) => v.value)),
  maxRouteDistance: z.number(),
  maxPriceAgeHours: z
    .string()
    .optional()
    .transform((val) => Number(val) || 72),
  cargoCapacity: z.number(),
  availableCredits: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  maxLandingPadSize: z.string().optional(),
  maxArrivalDistance: z.number(),
  includeFleetCarriers: z.boolean(),
  includeSurfaceStations: z.boolean(),
  includeOdyssey: z.boolean(),
});

export type FormSubmitProps = z.infer<typeof FormSubmitSchema>;

const FormResponseSchema = z.object({
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

export type FormResponseProps = z.infer<typeof FormResponseSchema>;
