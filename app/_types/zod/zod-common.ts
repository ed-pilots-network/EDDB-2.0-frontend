import { z } from 'zod';

export const ZodLandingPadEnumConst = z.enum(['SMALL', 'MEDIUM', 'LARGE']);
export type ZodLandingPadEnumType = z.infer<typeof ZodLandingPadEnumConst>;
