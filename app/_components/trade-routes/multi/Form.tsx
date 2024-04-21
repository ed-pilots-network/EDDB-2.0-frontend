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

export const MultiTradeRouteFormSchema = z.object({
  startSystem: z.object({ label: z.string() }).transform((val) => val?.label),
  startStation: z.string().optional(),
  finishSystem: z
    .object({ label: z.string() })
    .optional()
    .transform((val) => val?.label),
  commodityDisplayName: z
    .array(z.object({ value: z.string() }))
    .optional()
    .transform((val) => val?.map((v) => v.value)),
  maxRouteDistance: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  maxHopCount: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  minSupply: z.string().optional(),
  minDemand: z.string().optional(),
  maxPriceAgeHours: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  cargoCapacity: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  availableCredits: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  landingPadSize: z.string().optional(),
  maxArrivalDistance: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  includeFleetCarriers: z.boolean().optional(),
  includeOdyssey: z.boolean().optional(),
  includeSurfaceStations: z.boolean().optional(),
});

export type SubmitProps = z.infer<typeof MultiTradeRouteFormSchema>;

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
    resolver: zodResolver(MultiTradeRouteFormSchema),
  });

  const onSubmit: SubmitHandler<SubmitProps> = (data) => {
    console.log(data);
    onSubmitHandler(data);
  };

  // For demo purposes
  const [startSystemStations, setStartSystemStations] = useState<string[]>([]);

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
            isInvalid={!!(errors.startSystem && errors.startSystem.message)}
          >
            <FormLabel>Start System</FormLabel>
            <SystemsField
              fieldName="startSystem"
              control={control}
              placeholder="Select a system..."
              onChange={(newValue) => {
                setStartSystemStations(
                  newValue ? ['Station1', 'Station2', 'Station3'] : [],
                );
              }}
            />
            <FormErrorMessage>
              {errors.startSystem && errors.startSystem.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={!!(errors.startStation && errors.startStation.message)}
          >
            <FormLabel>Start Station (optional)</FormLabel>
            <Select
              register={register('startStation', {
                disabled: startSystemStations.length === 0,
              })}
              placeholder={
                startSystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            >
              {startSystemStations.length &&
                startSystemStations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
            </Select>
            <FormErrorMessage>
              {errors.startStation && errors.startStation.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={!!(errors.finishSystem && errors.finishSystem.message)}
          >
            <FormLabel>Finish System (optional)</FormLabel>
            <SystemsField
              fieldName="finishSystem"
              control={control}
              placeholder="Select a system..."
            />
            <FormErrorMessage>
              {errors.finishSystem && errors.finishSystem.message}
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
            isInvalid={!!(errors.maxHopCount && errors.maxHopCount.message)}
          >
            <FormLabel>Max Hop Count</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('maxHopCount')}
            />
            <FormErrorMessage>
              {errors.maxHopCount && errors.maxHopCount.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.maxHopCount && errors.maxHopCount.message)}
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
            isInvalid={!!(errors.minSupply && errors.minSupply.message)}
          >
            <FormLabel>Min. Supply</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('minSupply')}
              defaultValue={1}
            />
            <FormErrorMessage>
              {errors.minSupply && errors.minSupply.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.minDemand && errors.minDemand.message)}
          >
            <FormLabel>Min. Demand</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('minDemand')}
              defaultValue={1}
            />
            <FormErrorMessage>
              {errors.minDemand && errors.minDemand.message}
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
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('maxPriceAgeHours')}
            />
            <FormErrorMessage>
              {errors.maxPriceAgeHours && errors.maxPriceAgeHours.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem marginTop={30} colSpan={{ base: 1, md: 2, lg: 4 }}>
          <h2>
            <b>Station options:</b>
          </h2>
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
              !!(errors.landingPadSize && errors.landingPadSize.message)
            }
          >
            <FormLabel>Ship Size</FormLabel>
            <LandingPadsField register={register('landingPadSize')} />
            <FormErrorMessage>
              {errors.landingPadSize && errors.landingPadSize.message}
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
