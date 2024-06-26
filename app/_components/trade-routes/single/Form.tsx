import { useEffect, useState } from 'react';
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
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import ExpandIcon from '../../utility/ExpandIcon';
import { useGetData } from '@/app/_lib/api-calls';
import ChakraReactSelect from '../../inputs/form/ChakraReactSelect';
import { FormSubmitProps, FormSubmitSchema } from './Schema';
import { ICommodity } from '@/app/_types';

interface FormProps {
  onSubmitHandler: SubmitHandler<FormSubmitProps>;
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
  } = useForm<FormSubmitProps>({
    defaultValues: {
      cargoCapacity: 500,
      maxRouteDistance: 100,
      maxArrivalDistance: 1000,
      includeOdyssey: false,
      includeSurfaceStations: false,
      includeFleetCarriers: false,
    },
    resolver: zodResolver(FormSubmitSchema),
  });
  const buySystem = watch('buyFromSystemName', { value: 0, label: '' });
  const sellSystem = watch('sellToSystemName', { value: 0, label: '' });

  const { data: buyStationData, mutate: buyStationMutate } = useGetData<
    string[]
  >(`exploration/system/list-station-names?systemName=${buySystem?.label}`);

  const { data: sellStationData, mutate: sellStationMutate } = useGetData<
    string[]
  >(`exploration/system/list-station-names?systemName=${sellSystem?.label}`);

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

  const onSubmit: SubmitHandler<FormSubmitProps> = (data) => {
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
            isInvalid={
              !!(errors.buyFromSystemName && errors.buyFromSystemName.message)
            }
          >
            <FormLabel>Buy From System</FormLabel>
            <SystemsField
              fieldName="buyFromSystemName"
              control={control}
              placeholder="Select a system..."
            />
            <FormErrorMessage>
              {errors.buyFromSystemName && errors.buyFromSystemName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.buyFromStationName && errors.buyFromStationName.message)
            }
          >
            <FormLabel>Buy from Station</FormLabel>
            <ChakraReactSelect
              fieldName="buyFromStationName"
              options={buySystemStations}
              control={control}
              placeholder={
                buySystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            />
            <FormErrorMessage>
              {errors.buyFromStationName && errors.buyFromStationName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.sellToSystemName && errors.sellToSystemName.message)
            }
          >
            <FormLabel>Sell to System</FormLabel>
            <SystemsField
              fieldName="sellToSystemName"
              control={control}
              placeholder="Select a system..."
            />
            <FormErrorMessage>
              {errors.sellToSystemName && errors.sellToSystemName.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControl
            isInvalid={
              !!(errors.sellToStationName && errors.sellToStationName.message)
            }
          >
            <FormLabel>Sell to Station</FormLabel>
            <ChakraReactSelect
              fieldName="sellToStationName"
              options={sellSystemStations}
              control={control}
              placeholder={
                sellSystemStations.length === 0
                  ? 'Enter a system first...'
                  : 'Select a station (optional)'
              }
            />
            <FormErrorMessage>
              {errors.sellToStationName && errors.sellToStationName.message}
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
            <InputGroup>
              <Input
                type="number"
                variant="outline"
                borderColor={GetColor('border')}
                borderRight={0}
                _hover={{
                  borderColor: GetColor('border'),
                }}
                {...register('maxRouteDistance', { valueAsNumber: true })}
              />
              <InputRightAddon borderColor={GetColor('border')} borderLeft={0}>
                LY
              </InputRightAddon>
            </InputGroup>
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
              {...register('cargoCapacity', { valueAsNumber: true })}
            />
            <FormErrorMessage>
              {errors.cargoCapacity && errors.cargoCapacity.message}
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
                  errors.commodityDisplayNames &&
                  errors.commodityDisplayNames.message
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
              <Select register={register('maxPriceAgeHours')} defaultValue={72}>
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
              <InputGroup>
                <Input
                  type="number"
                  variant="outline"
                  borderColor={GetColor('border')}
                  borderRight={0}
                  _hover={{
                    borderColor: GetColor('border'),
                  }}
                  {...register('maxArrivalDistance', { valueAsNumber: true })}
                />
                <InputRightAddon
                  borderColor={GetColor('border')}
                  borderLeft={0}
                >
                  LS
                </InputRightAddon>
              </InputGroup>
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
