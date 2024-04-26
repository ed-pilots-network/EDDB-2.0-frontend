import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import powers from '@/app/_lib/power-list';
import governments from '@/app/_lib/government-list';
import allegiances from '@/app/_lib/allegiance-list';
import GetColor from '@/app/_hooks/colorSelector';
import {
  PowersField,
  AllegiancesField,
  GovernmentsField,
  LandingPadsField,
  StationTypesField,
  CommoditiesField,
  SystemsField,
} from '@/app/_components/inputs';
import CheckboxGroup from '../../form/CheckboxGroup';
import Select from '../../inputs/form/Select';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  FormErrorMessage,
  Checkbox,
  Collapse,
  HStack,
} from '@chakra-ui/react';
import { ICommodity } from '@/app/_types';
import ExpandIcon from '../../utility/ExpandIcon';

export const MultiTradeRouteFormSchema = z.object({
  startSystem: z
    .object({ label: z.string() })
    .optional()
    .transform((val) => val?.label),
  startStation: z.string().optional(),
  finishSystem: z
    .object({ label: z.string() })
    .optional()
    .transform((val) => val?.label),
  commodityId: z.array(z.object({ value: z.string() })).optional(),

  maxHopDistance: z.string().optional(),
  maxHopCount: z.string().optional(),
  minSupply: z.string().optional(),
  minDemand: z.string().optional(),
  maxPriceAge: z.number().optional(),
  cargoCapacity: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  availableCredits: z
    .string()
    .optional()
    .transform((val) => Number(val)),
  government: z
    .enum(['', ...(governments.map((item) => item) as [string, ...string[]])])
    .optional(),
  allegiance: z
    .enum(['', ...(allegiances.map((item) => item) as [string, ...string[]])])
    .optional(),
  requiresPermit: z.boolean(),
  landingPadSize: z.string().optional(),
  maxDistanceToArrival: z.string().optional(),
  includeFleetCarriers: z.boolean().optional(),
  includeOdyssey: z.boolean().optional(),
  includePlanetary: z.boolean().optional(),
  includeOrbital: z.boolean().optional(),
  power: z
    .enum(['', ...(powers.map((item) => item) as [string, ...string[]])])
    .optional(),
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
  const [isExpanded, setIsExpanded] = useState(true);
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
      </Grid>

      <Collapse in={isExpanded} animateOpacity style={{ width: '100%' }}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          marginBottom="10"
        >
          <GridItem marginTop={30} colSpan={{ base: 1, md: 2, lg: 4 }}>
            <h2>
              <b>Route options:</b>
            </h2>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl
              isInvalid={!!(errors.commodityId && errors.commodityId.message)}
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
                !!(errors.maxHopDistance && errors.maxHopDistance.message)
              }
            >
              <FormLabel>Max Hop Distance</FormLabel>
              <Input
                type="number"
                variant="outline"
                placeholder="Enter a number..."
                borderColor={GetColor('border')}
                _hover={{
                  borderColor: GetColor('border'),
                }}
                {...register('maxHopDistance')}
              />
              <FormErrorMessage>
                {errors.maxHopDistance && errors.maxHopDistance.message}
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
              isInvalid={!!(errors.maxPriceAge && errors.maxPriceAge.message)}
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
                {...register('maxPriceAge')}
              />
              <FormErrorMessage>
                {errors.maxPriceAge && errors.maxPriceAge.message}
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
                >
                  <Checkbox
                    colorScheme="orange"
                    {...register('requiresPermit')}
                    borderColor={GetColor('border')}
                  >
                    Requires Permit
                  </Checkbox>
                  <FormErrorMessage>
                    {errors.requiresPermit && errors.requiresPermit.message}
                  </FormErrorMessage>
                </FormControl>
              </CheckboxGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </Collapse>

      <HStack justifyContent="space-between" paddingRight={[0, '40%', '50%']}>
        <Button
          type="submit"
          variant="submit"
          id="submit"
          isLoading={isLoading}
        >
          Find Routes
        </Button>
        <ExpandIcon isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </HStack>
    </form>
  );
};

export default Form;
