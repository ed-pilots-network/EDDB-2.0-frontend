import { z } from 'zod';

export const SingleTradeRouteFormSchema = z.object({
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
  maxRouteDistance: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  maxPriceAgeHours: z
    .string()
    .optional()
    .transform((val) => Number(val) || 72),
  cargoCapacity: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  availableCredits: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  maxLandingPadSize: z.string().optional(),
  maxArrivalDistance: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  includeFleetCarriers: z.boolean().optional(),
  includeSurfaceStations: z.boolean().optional(),
  includeOdyssey: z.boolean().optional(),
});

export type SubmitProps = z.infer<typeof SingleTradeRouteFormSchema>;
