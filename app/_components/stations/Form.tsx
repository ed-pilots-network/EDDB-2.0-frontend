import powers from '@/app/_lib/power-list';
import governments from '@/app/_lib/government-list';
import economies from '@/app/_lib/economy-list';
import allegiances from '@/app/_lib/allegiance-list';
import factionStates from '@/app/_lib/faction-state-list';

import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  FormErrorMessage,
  Checkbox,
  Text,
} from '@chakra-ui/react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import GetColor from '@/app/_hooks/colorSelector';
import {
  PowersField,
  AllegiancesField,
  GovernmentsField,
  PowerEffectsField,
  FactionStatesField,
  EconomiesField,
  LandingPadsField,
  StationTypesField,
  ShipsField,
  ModulesField,
  CommoditiesField,
  FacilitiesField,
} from '@/app/_components/inputs';
import CheckboxGroup from '../form/CheckboxGroup';
import { ICommodity } from '@/app/_types';
import StationsField from '../inputs/Stations';

export const StationFormSchema = z.object({
  stationId: z.string(),
  ships: z.array(z.object({ value: z.string() })).optional(),
  modules: z.array(z.object({ value: z.string() })).optional(),
  commodityDisplayName: z.array(z.object({ value: z.string() })).optional(),
  facilities: z.array(z.object({ value: z.string() })).optional(),
  allegiance: z
    .enum(['', ...(allegiances.map((item) => item) as [string, ...string[]])])
    .optional(),
  government: z
    .enum(['', ...(governments.map((item) => item) as [string, ...string[]])])
    .optional(),
  system: z.string().optional(),
  landingPadSize: z.string().optional(),
  includeFleetCarriers: z.boolean().optional(),
  includeOdyssey: z.boolean().optional(),
  includePlanetary: z.boolean().optional(),
  includeOrbital: z.boolean().optional(),
  maxDistanceToArrival: z.string().optional(),
  requiresPermit: z.boolean(),
  power: z
    .enum(['', ...(powers.map((item) => item) as [string, ...string[]])])
    .optional(),
  powerEffect: z.enum(['', 'control', 'expansion', 'exploited']).optional(),
  factionState: z
    .enum(['', ...(factionStates.map((item) => item) as [string, ...string[]])])
    .optional(),
  economy: z
    .enum(['', ...(economies.map((item) => item) as [string, ...string[]])])
    .optional(),
});

export type SubmitProps = z.infer<typeof StationFormSchema>;

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
    resolver: zodResolver(StationFormSchema),
  });

  const onSubmit: SubmitHandler<SubmitProps> = (data) => {
    onSubmitHandler(data);
  };

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
        <GridItem marginBottom={30} colSpan={{ base: 1, md: 2, lg: 4 }}>
          <FormControl
            isInvalid={!!(errors.stationId && errors.stationId.message)}
          >
            <FormLabel>Station</FormLabel>
            <StationsField fieldName="stationId" control={control} />
            <FormErrorMessage>
              {errors.stationId && errors.stationId.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

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
          <FormControl isInvalid={!!(errors.ships && errors.ships.message)}>
            <FormLabel>Ships</FormLabel>
            <ShipsField control={control} placeholder="Select ships..." />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl isInvalid={!!(errors.modules && errors.modules.message)}>
            <FormLabel>Modules</FormLabel>
            <ModulesField
              control={control}
              placeholder="Select modules..."
              isMulti={true}
            />
          </FormControl>
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
              commodities={commodities}
              isMulti={true}
              placeholder="Select commodities..."
            />
            <FormErrorMessage>
              {errors.commodityDisplayName &&
                errors.commodityDisplayName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl isInvalid={!!(errors.system && errors.system.message)}>
            <FormLabel>Nearest System</FormLabel>
            <Input
              variant="outline"
              placeholder="Enter system name..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('system')}
            />
            <FormErrorMessage>
              {errors.system && errors.system.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.facilities && errors.facilities.message)}
          >
            <FormLabel>Facilities</FormLabel>
            <FacilitiesField
              control={control}
              placeholder="Select facilities..."
              isMulti={true}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.allegiance && errors.allegiance.message)}
          >
            <FormLabel>Allegiance</FormLabel>
            <AllegiancesField register={register('allegiance')} />
            <FormErrorMessage>
              {errors.allegiance && errors.allegiance.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.government && errors.government.message)}
          >
            <FormLabel>Government</FormLabel>
            <GovernmentsField register={register('government')} />
            <FormErrorMessage>
              {errors.government && errors.government.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={
              !!(
                errors.maxDistanceToArrival &&
                errors.maxDistanceToArrival.message
              )
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
              {...register('maxDistanceToArrival')}
            />
            <FormErrorMessage>
              {errors.maxDistanceToArrival &&
                errors.maxDistanceToArrival.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={!!(errors.power && errors.power.message)}>
            <FormLabel>Powers</FormLabel>
            <PowersField register={register('power')} />
            <FormErrorMessage>
              {errors.power && errors.power.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.powerEffect && errors.powerEffect.message)}
          >
            <FormLabel>Power Effect</FormLabel>
            <PowerEffectsField register={register('powerEffect')} />
            <FormErrorMessage>
              {errors.powerEffect && errors.powerEffect.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.factionState && errors.factionState.message)}
          >
            <FormLabel>Faction State</FormLabel>
            <FactionStatesField register={register('factionState')} />
            <FormErrorMessage>
              {errors.factionState && errors.factionState.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={!!(errors.economy && errors.economy.message)}>
            <FormLabel>Economy</FormLabel>
            <EconomiesField register={register('economy')} />
            <FormErrorMessage>
              {errors.economy && errors.economy.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

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

        <GridItem>
          <FormControl>
            <FormLabel>Other Options</FormLabel>
            <CheckboxGroup>
              <FormControl
                isInvalid={
                  !!(errors.requiresPermit && errors.requiresPermit.message)
                }
                display="flex"
              >
                <Checkbox
                  colorScheme="orange"
                  {...register('requiresPermit')}
                  borderColor={GetColor('border')}
                >
                  <Text fontSize="sm">Requires Permit</Text>
                </Checkbox>
                <FormErrorMessage>
                  {errors.requiresPermit && errors.requiresPermit.message}
                </FormErrorMessage>
              </FormControl>
            </CheckboxGroup>
          </FormControl>
        </GridItem>
      </Grid>
      <Button type="submit" variant="submit" id="submit" isLoading={isLoading}>
        Find Stations
      </Button>
    </form>
  );
};

export default Form;
