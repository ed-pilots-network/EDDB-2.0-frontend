import powers from '@/app/_lib/power-list';
import governments from '@/app/_lib/government-list';
import securities from '@/app/_lib/security-list';
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
import Select from '../inputs/form/Select';
import {
  AllegiancesField,
  EconomiesField,
  FactionStatesField,
  GovernmentsField,
  PowerEffectsField,
  PowersField,
} from '../inputs';

export const SystemFormSchema = z.object({
  systemId: z.string(),
  onlyPopulated: z.boolean(),
  allegiance: z
    .enum(['', ...(allegiances.map((item) => item) as [string, ...string[]])])
    .optional(),
  government: z
    .enum(['', ...(governments.map((item) => item) as [string, ...string[]])])
    .optional(),
  economy: z
    .enum(['', ...(economies.map((item) => item) as [string, ...string[]])])
    .optional(),
  minorFaction: z.string().optional(),
  presenceType: z.string().optional(),
  requiresPermit: z.boolean(),
  stationFilter: z
    .enum(['', 'hasStations', 'hasPlanetary', 'hasOrbital', 'hasNoStations'])
    .optional(),
  power: z
    .enum(['', ...(powers.map((item) => item) as [string, ...string[]])])
    .optional(),
  powerEffect: z.enum(['', 'Control', 'Expansion', 'Exploited']).optional(),
  security: z
    .enum(['', ...(securities.map((item) => item) as [string, ...string[]])])
    .optional(),
  factionState: z
    .enum(['', ...(factionStates.map((item) => item) as [string, ...string[]])])
    .optional(),
});

export type SubmitProps = z.infer<typeof SystemFormSchema>;

interface FormProps {
  onSubmitHandler: SubmitHandler<SubmitProps>;
  isLoading: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmitHandler, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
    resolver: zodResolver(SystemFormSchema),
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
        <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
          <FormControl
            isInvalid={!!(errors.systemId && errors.systemId.message)}
          >
            <FormLabel>System</FormLabel>
            <Input
              placeholder="Search by system name..."
              borderColor={GetColor('border')}
              _hover={{
                borderColor: GetColor('border'),
              }}
              {...register('systemId')}
            />
            <FormErrorMessage>
              {errors.systemId && errors.systemId.message}
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
          <FormControl isInvalid={!!(errors.economy && errors.economy.message)}>
            <FormLabel>Economy</FormLabel>
            <EconomiesField register={register('economy')} />
            <FormErrorMessage>
              {errors.economy && errors.economy.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.security && errors.security.message)}
          >
            <FormLabel>Security Level</FormLabel>
            <Select register={register('security')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="anarchy">Anarchy</option>
              <option value="lawless">Lawless</option>
            </Select>
            <FormErrorMessage>
              {errors.security && errors.security.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
          <FormControl
            isInvalid={!!(errors.minorFaction && errors.minorFaction.message)}
          >
            <FormLabel>Minor Faction</FormLabel>
            <Input
              borderColor={GetColor('border')}
              variant="outline"
              placeholder="Enter a minor faction..."
              {...register('minorFaction')}
            />
            <FormErrorMessage>
              {errors.minorFaction && errors.minorFaction.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.presenceType && errors.presenceType.message)}
          >
            <FormLabel>Presence Type</FormLabel>
            <Select register={register('presenceType')}>
              <option value="controlling">Controlling</option>
              <option value="presence">Presence</option>
            </Select>
            <FormErrorMessage>
              {errors.presenceType && errors.presenceType.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl
            isInvalid={!!(errors.stationFilter && errors.stationFilter.message)}
          >
            <FormLabel>Station Filter</FormLabel>
            <Select register={register('stationFilter')}>
              <option value="hasStations">Has Stations</option>
              <option value="hasPlanetary">Has Planetary</option>
              <option value="hasOrbital">Has Orbital</option>
              <option value="hasNoStations">Has No Stations</option>
            </Select>
            <FormErrorMessage>
              {errors.stationFilter && errors.stationFilter.message}
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
        <GridItem>
          <FormControl
            isInvalid={!!(errors.onlyPopulated && errors.onlyPopulated.message)}
          >
            <Checkbox
              colorScheme="orange"
              {...register('onlyPopulated')}
              borderColor={GetColor('border')}
            >
              Only Populated Systems
            </Checkbox>
            <FormErrorMessage>
              {errors.onlyPopulated && errors.onlyPopulated.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
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
              <Text fontSize="sm">Requires Permit</Text>
            </Checkbox>
            <FormErrorMessage>
              {errors.requiresPermit && errors.requiresPermit.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
      <Button type="submit" variant="submit" id="submit" isLoading={isLoading}>
        Find Systems
      </Button>
    </form>
  );
};

export default Form;
