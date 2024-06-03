import { z } from 'zod';

export const ZodSystemDtoApiConst = z.object({
  eliteId: z.number(),
  name: z.string(),
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
});

export type ZodSystemDtoApiType = z.infer<typeof ZodSystemDtoApiConst>;
