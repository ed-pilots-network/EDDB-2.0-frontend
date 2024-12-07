import {
  CommoditiesField,
  LandingPadsField,
  StationTypesField,
  SystemsField,
} from '@/app/_components/inputs';
import Select from '@/app/_components/inputs/form/Select';
import GetColor from '@/app/_hooks/colorSelector';
import type { ICommodity } from '@/app/_types';
import {
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { SystemSelectGroup } from '../../inputs/Systems';
import ExpandIcon from '../../utility/ExpandIcon';
import { FormProps, FormSubmitProps, FormSubmitSchema } from './Schema';

interface ComponentProps {
  onSubmitHandler: SubmitHandler<FormSubmitProps>;
  isLoading: boolean;
  commodities: ICommodity[] | null;
}

const Form: React.FC<ComponentProps> = ({
  onSubmitHandler,
  isLoading,
  commodities,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [referenceSystem, setReferenceSystem] = useState<SystemSelectGroup>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      minSupply: 10000,
      minDemand: 10000,
      maxRouteDistance: 100,
      maxArrivalDistance: 1000,
      includeOdyssey: true,
      includeSurfaceStations: true,
      includeFleetCarriers: false,
    },
    resolver: zodResolver(FormSubmitSchema),
  });
  const onSubmit: SubmitHandler<FormSubmitProps> = (data: FormProps) => {
    let submitData = {
      ...data,
      xCoordinate: referenceSystem?.xCoordinate ?? undefined,
      yCoordinate: referenceSystem?.yCoordinate ?? undefined,
      zCoordinate: referenceSystem?.zCoordinate ?? undefined,
    };

    if (submitData.referenceSystemName) delete submitData.referenceSystemName;
    onSubmitHandler(submitData);
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
              !!(
                errors.referenceSystemName && errors.referenceSystemName.message
              )
            }
          >
            <FormLabel>Reference System</FormLabel>
            <SystemsField
              fieldName="referenceSystemName"
              control={control}
              placeholder="Select a system..."
              onChange={(systemValue) => {
                setReferenceSystem(systemValue as SystemSelectGroup);
              }}
            />
            <FormErrorMessage>
              {errors.referenceSystemName && errors.referenceSystemName.message}
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
            isInvalid={!!(errors.minSupply && errors.minSupply.message)}
          >
            <FormLabel>Min Supply</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('minSupply', { valueAsNumber: true })}
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
            <FormLabel>Min Demand</FormLabel>
            <Input
              type="number"
              variant="outline"
              placeholder="Enter a number..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('minDemand', { valueAsNumber: true })}
            />
            <FormErrorMessage>
              {errors.minDemand && errors.minDemand.message}
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
          Find Route
        </Button>
        <ExpandIcon isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </HStack>
    </form>
  );
};

export default Form;
