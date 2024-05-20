import { useEffect, useState } from 'react';
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
import Select from '@/app/_components/inputs/form/Select';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  FormErrorMessage,
  HStack,
  Collapse,
} from '@chakra-ui/react';
import { ICommodity } from '@/app/_types';
import ExpandIcon from '../../utility/ExpandIcon';
import { useGetData } from '@/app/_lib/api-calls';
import ChakraReactSelect from '../../inputs/form/ChakraReactSelect';

export const SingleTradeRouteFormSchema = z.object({
  buySystemName: z
    .object({ label: z.string(), value: z.number() })
    .optional()
    .nullable(),
  buyStationName: z
    .object({ label: z.string(), value: z.string() })
    .optional()
    .nullable()
    .transform((val) => val?.value),
  sellSystemName: z
    .object({ label: z.string(), value: z.number() })
    .optional()
    .nullable(),
  sellStationName: z
    .object({ label: z.string(), value: z.string() })
    .optional()
    .nullable()
    .transform((val) => val?.value),
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
  const [isExpanded, setIsExpanded] = useState(false);

  const [buySystemStations, setBuySystemStations] = useState<string[]>([]);
  const [sellSystemStations, setSellSystemStations] = useState<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitProps>({
    defaultValues: {
      maxPriceAgeHours: 72,
    },
    resolver: zodResolver(SingleTradeRouteFormSchema),
  });
  const buySystem = watch('buySystemName', { value: 0, label: '' });
  const sellSystem = watch('sellSystemName', { value: 0, label: '' });

  const { data: buyStationData, mutate: buyStationMutate } = useGetData(
    `exploration/system/list-station-names?systemName=${buySystem?.label}`,
  );

  const { data: sellStationData, mutate: sellStationMutate } = useGetData(
    `exploration/system/list-station-names?systemName=${sellSystem?.label}`,
  );

  useEffect(() => {
    const systemName = buySystem?.label;
    const fetchData = async () => {
      await buyStationMutate();
    };

    if (systemName) fetchData();
  }, [buySystem, buyStationMutate]);

  useEffect(() => {
    if (buyStationData) setBuySystemStations(buyStationData);
  }, [buyStationData]);

  useEffect(() => {
    const systemName = sellSystem?.label;
    const fetchData = async () => {
      await sellStationMutate();
    };

    if (systemName) fetchData();
  }, [sellSystem, sellStationMutate]);

  useEffect(() => {
    if (sellStationData) setSellSystemStations(sellStationData);
  }, [sellStationData]);

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
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={!!(errors.buySystemName && errors.buySystemName.message)}
          >
            <FormLabel>Buy From System</FormLabel>
            <SystemsField
              fieldName="buySystemName"
              control={control}
              placeholder="Select a system..."
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
            <ChakraReactSelect
              fieldName="buyStationName"
              options={buySystemStations}
              control={control}
              placeholder={
                buySystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            />
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
            <ChakraReactSelect
              fieldName="sellStationName"
              options={sellSystemStations}
              control={control}
              placeholder={
                sellSystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            />
            <FormErrorMessage>
              {errors.sellStationName && errors.sellStationName.message}
            </FormErrorMessage>
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
              placeholder="in LY"
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

      <Collapse in={isExpanded}>
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
                !!(errors.cargoCapacity && errors.cargoCapacity.message)
              }
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
              <Select
                register={register('maxPriceAgeHours', { valueAsNumber: true })}
              >
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
                !!(
                  errors.maxArrivalDistance && errors.maxArrivalDistance.message
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
