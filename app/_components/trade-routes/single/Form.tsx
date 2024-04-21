import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import GetColor from '@/app/_hooks/colorSelector';
import {
  LandingPadsField,
  StationTypesField,
  CommoditiesField,
  SystemsField,
} from '@/app/_components/inputs';
import { useState } from 'react';
import Select from '../../inputs/form/Select';
import { ICommodity } from '@/app/_types';

export const SingleTradeRouteFormSchema = z.object({
  buySystemName: z
    .object({ label: z.string() })
    .optional()
    .transform((val) => val?.label),
  buyStationName: z.string().optional(),
  sellSystemName: z
    .object({ label: z.string() })
    .optional()
    .transform((val) => val?.label),
  sellStationName: z.string().optional(),
  commodityDisplayName: z
    .array(z.object({ value: z.string() }))
    .optional()
    .transform((val) => val?.map((v) => v.value)),
  maxRouteDistance: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  maxPriceAgeHours: z.number().optional(),
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

interface FormProps {
  onSubmitHandler: SubmitHandler<SubmitProps>;
  isLoading: boolean;
  commodities: ICommodity[] | null;
}

const Form: React.FC<FormProps> = ({
  onSubmitHandler,
  isLoading,
  commodities,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      maxPriceAgeHours: 72,
    },
    resolver: zodResolver(SingleTradeRouteFormSchema),
  });

  const onSubmit: SubmitHandler<SubmitProps> = (data) => {
    onSubmitHandler(data);
  };

  // For demo purposes
  const [buySystemStations, setBuySystemStations] = useState<string[]>([]);
  const [sellSystemStations, setSellSystemStations] = useState<string[]>([]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
        marginBottom="10"
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={!!(errors.buySystemName && errors.buySystemName.message)}
          >
            <FormLabel>Buy From System</FormLabel>
            <SystemsField
              fieldName="buySystemName"
              control={control}
              placeholder="Select a system..."
              onChange={(newValue) => {
                setBuySystemStations(
                  newValue ? ['Station1', 'Station2', 'Station3'] : [],
                );
              }}
            />
            <FormErrorMessage>
              {errors.buySystemName && errors.buySystemName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.buyStationName && errors.buyStationName.message)
            }
          >
            <FormLabel>Buy from Station</FormLabel>
            <Select
              register={register('buyStationName', {
                disabled: buySystemStations.length === 0,
              })}
              placeholder={
                buySystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            >
              {buySystemStations.length &&
                buySystemStations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>
              {errors.buyStationName && errors.buyStationName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.sellSystemName && errors.sellSystemName.message)
            }
          >
            <FormLabel>Sell to System</FormLabel>
            <SystemsField
              fieldName="sellSystemName"
              control={control}
              placeholder="Select a system..."
              onChange={(newValue) => {
                setSellSystemStations(
                  newValue ? ['Station1', 'Station2', 'Station3'] : [],
                );
              }}
            />
            <FormErrorMessage>
              {errors.sellSystemName && errors.sellSystemName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.sellStationName && errors.sellStationName.message)
            }
          >
            <FormLabel>Sell to Station</FormLabel>
            <Select
              register={register('sellStationName', {
                disabled: sellSystemStations.length === 0,
              })}
              placeholder={
                sellSystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            >
              {sellSystemStations.length &&
                sellSystemStations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>
              {errors.sellStationName && errors.sellStationName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem marginTop={30} colSpan={{ base: 1, md: 2, lg: 4 }}>
          <h2>
            <b>Route options:</b>
          </h2>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(
                errors.commodityDisplayName &&
                errors.commodityDisplayName.message
              )
            }
          >
            <FormLabel>Commodities</FormLabel>
            <CommoditiesField
              control={control}
              placeholder="Select commodities..."
              commodities={commodities}
              isMulti={true}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(errors.maxRouteDistance && errors.maxRouteDistance.message)
            }
          >
            <FormLabel>Max Route Distance</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('maxRouteDistance')}
            />
            <FormErrorMessage>
              {errors.maxRouteDistance && errors.maxRouteDistance.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.cargoCapacity && errors.cargoCapacity.message)}
          >
            <FormLabel>Cargo Capacity</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('cargoCapacity')}
            />
            <FormErrorMessage>
              {errors.cargoCapacity && errors.cargoCapacity.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(errors.availableCredits && errors.availableCredits.message)
            }
          >
            <FormLabel>Available Credits</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('availableCredits')}
            />
            <FormErrorMessage>
              {errors.availableCredits && errors.availableCredits.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(errors.maxPriceAgeHours && errors.maxPriceAgeHours.message)
            }
          >
            <FormLabel>Max Price Age</FormLabel>
            <Select register={register('maxPriceAgeHours')}>
              <option value={12}>12 hours</option>
              <option value={24}>1 day</option>
              <option value={48}>2 days</option>
              <option value={72}>3 days</option>
            </Select>
            <FormErrorMessage>
              {errors.maxPriceAgeHours && errors.maxPriceAgeHours.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(errors.maxArrivalDistance && errors.maxArrivalDistance.message)
            }
          >
            <FormLabel>Max Distance From Star</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="In LS"
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('maxArrivalDistance')}
            />
            <FormErrorMessage>
              {errors.maxArrivalDistance && errors.maxArrivalDistance.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl>
            <FormLabel>Station Type</FormLabel>
            <StationTypesField register={register} />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(errors.maxLandingPadSize && errors.maxLandingPadSize.message)
            }
          >
            <FormLabel>Ship Size</FormLabel>
            <LandingPadsField register={register('maxLandingPadSize')} />
            <FormErrorMessage>
              {errors.maxLandingPadSize && errors.maxLandingPadSize.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <Button type="submit" variant="submit" id="submit" isLoading={isLoading}>
        Find Routes
      </Button>
    </form>
  );
};

export default Form;
