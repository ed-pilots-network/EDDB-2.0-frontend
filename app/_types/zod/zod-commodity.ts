import { z } from 'zod';

export const ZodCommodityTypeEnumApiConst = z.enum([
  'CHEMICALS',
  'CONSUMER_ITEMS',
  'LEGAL_DRUGS',
  'FOODS',
  'INDUSTRIAL_MATERIALS',
  'MACHINERY',
  'MEDICINES',
  'METALS',
  'MINERALS',
  'SALVAGE',
  'SLAVES',
  'TECHNOLOGY',
  'TEXTILES',
  'WASTE',
  'WEAPONS',
]);

export type ZodCommodityTypeEnumApiType = z.infer<
  typeof ZodCommodityTypeEnumApiConst
>;

export const ZodCommodityNameApiConst = z.object({
  commodityName: z.string(),
  displayName: z.string(),
  type: ZodCommodityTypeEnumApiConst,
  isRare: z.boolean(),
});

export type ZodCommodityNameApiType = z.infer<typeof ZodCommodityNameApiConst>;
