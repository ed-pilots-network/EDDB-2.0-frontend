import {
  Link,
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCity, faSun } from '@fortawesome/free-solid-svg-icons';
import type { FormResponseProps } from './Schema';

const SingleTradeRoute = ({
  route,
  cargoCapacity,
}: {
  route: FormResponseProps;
  cargoCapacity: number;
}) => (
  <Card>
    <CardBody>
      <CardHeader>
        <Flex justify="space-between">
          <Box>
            <Text>
              <Icon as={FontAwesomeIcon} icon={faSun} />
              <Link marginEnd={2} color={GetColor('accent-text')} href="#">
                {` ${route.buyFromStationDto.system.name}`}
              </Link>

              <Text fontStyle="italic" as="span">
                {` ${Math.round(route.buyFromStationDto.arrivalDistance)}ls `}
              </Text>
              <Icon
                marginEnd={2}
                as={FontAwesomeIcon}
                icon={faArrowRight}
              ></Icon>

              <Icon as={FontAwesomeIcon} icon={faCity} />
              <Link marginEnd={2} color={GetColor('textSelected')} href="#">
                {` ${route.buyFromStationDto.name}`}
              </Link>

              <Text fontStyle="italic" as="span">
                {`${Math.round(route.routeDistance)} ly `}
              </Text>
              <Icon marginEnd={2} as={FontAwesomeIcon} icon={faArrowRight} />

              <Icon as={FontAwesomeIcon} icon={faSun} />
              <Link marginEnd={2} color={GetColor('accent-text')} href="#">
                {` ${route.sellToStationDto.system.name}`}
              </Link>

              <Text fontStyle="italic" as="span">
                {` ${Math.round(route.sellToStationDto.arrivalDistance)}ls `}
              </Text>
              <Icon marginEnd={2} as={FontAwesomeIcon} icon={faArrowRight} />

              <Icon as={FontAwesomeIcon} icon={faCity} />
              <Link marginEnd={2} color={GetColor('textSelected')} href="#">
                {` ${route.sellToStationDto.name}`}
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading as="span" size="sm">
              {cargoCapacity * route.profit}
              <Text as="span" color={GetColor('border-accent')}>
                cr
              </Text>
            </Heading>
          </Box>
        </Flex>
      </CardHeader>
      <SimpleGrid columns={2} spacing={10}>
        <Box />
        <Box />
      </SimpleGrid>
    </CardBody>
  </Card>
);

const Response = ({
  results,
  cargoCapacity,
}: {
  results: FormResponseProps[];
  cargoCapacity: number;
}) => (
  <>
    {results
      .sort((b: FormResponseProps, a: FormResponseProps) => a.profit - b.profit)
      .map((route, index) => (
        <SingleTradeRoute
          key={index}
          route={route}
          cargoCapacity={cargoCapacity}
        />
      ))}
  </>
);

export default Response;
