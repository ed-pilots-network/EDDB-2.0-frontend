import React, { useState } from 'react';

import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { formatThousands } from '@/app/_hooks/textFormatting';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import {
  RenderStationTypeIcon,
  truncateString,
} from '@/components/utility/common-components';
import useColorMode from '@/app/_hooks/useColorMode';
import { calculateTimeDifference } from '@/app/_components/utility/common-functions';
import GridRowExpandIcon from '@/app/_components/utility/GridExpandIcon';
import type { FormResponseProps } from '../Schema';

const ResponseBody = ({
  data,
  cargoCapacity,
}: {
  data: FormResponseProps;
  cargoCapacity: number;
}) => {
  const [showItemCard, setShowItemCard] = useState(false);
  const { isDark } = useColorMode();

  const expand = keyframes`
      from {transform: translateY(-150px);}
      to {transform: translateY(0);}
    `;

  const toggleItemCard = () => (
    <Box overflow="hidden" width="100%">
      <Card
        variant="unstyled"
        bg="inherit"
        direction={{ base: 'column', sm: 'row' }}
        animation={`${expand} 0.2s linear`}
        fontSize="sm"
        size="sm"
        width="100%"
      >
        <CardBody lineHeight={2}>
          <Grid
            gridTemplateColumns={'2fr 4fr 4fr 1fr'}
            rowGap="1"
            padding={4}
            width="100%"
          >
            <VStack alignItems="start">
              <HStack>
                <Text>Profit Per: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  data.profit,
                )} cr`}</Text>
              </HStack>
              <HStack>
                <Text>Shortage: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  Math.round(data.demand - data.stock),
                )} units`}</Text>
              </HStack>
              <HStack>
                <Text>Commodity:</Text>
                <Text color={GetColor('border-accent')}>
                  {data.commodityDto.displayName}
                </Text>
              </HStack>
            </VStack>
            <VStack alignItems="start">
              <HStack>
                <Text>Supply: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  data.stock,
                )} units`}</Text>
              </HStack>
              <HStack>
                <Text>Buy Price: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  data.buyPrice,
                )} cr`}</Text>
              </HStack>
              <Text>
                Last Updated:{' '}
                {calculateTimeDifference(data.buyFromStationDto.marketUpdateAt)}
              </Text>
            </VStack>
            <VStack alignItems="start">
              <HStack>
                <Text>Demand: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  data.demand,
                )} units`}</Text>
              </HStack>
              <HStack>
                <Text>Sell Price: </Text>
                <Text color={GetColor('border-accent')}>{`${formatThousands(
                  data.sellPrice,
                )} cr`}</Text>
              </HStack>
              <Text>
                Last Updated:{' '}
                {calculateTimeDifference(data.sellToStationDto.marketUpdateAt)}
              </Text>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </Box>
  );

  return (
    <Flex
      width="100%"
      fontSize="sm"
      flexFlow="column"
      onClick={() => setShowItemCard(!showItemCard)}
      _odd={{
        background: `${GetColor('grid-accent')}`,
        borderRadius: 'md',
      }}
    >
      <HStack>
        <Grid
          gridTemplateColumns={'2fr 4fr 4fr 1fr'}
          rowGap="1"
          padding={4}
          width="100%"
        >
          <VStack alignItems="start" as={GridItem}>
            <Text fontStyle="italic" fontWeight="700">
              {`${Math.round(+formatThousands(data.routeDistance))} ly`}
            </Text>
            <HStack>
              <Text>Profit: </Text>
              <Text color={GetColor('border-accent')} fontWeight="700">
                {` ${formatThousands(cargoCapacity * data.profit)} cr`}
              </Text>
            </HStack>
          </VStack>
          <VStack alignItems="start" as={GridItem}>
            <Text>From: </Text>
            <HStack>
              <Link
                as={NextLink}
                color={GetColor('textSelected')}
                marginEnd={2}
                href="#"
                display="flex"
                gap={2}
              >
                {truncateString(data.buyFromStationDto.system.name, 15)}
              </Link>
              <Text fontStyle="italic" as="span">
                {`${Math.round(data.buyFromStationDto.arrivalDistance)} ls`}
              </Text>
              <Icon
                marginEnd={2}
                as={FontAwesomeIcon}
                icon={faRightLong}
                size="lg"
              />
              <Link
                marginEnd={2}
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={2}
              >
                <RenderStationTypeIcon
                  station={data.buyFromStationDto}
                  isDark={isDark}
                />
                {truncateString(data.buyFromStationDto.name, 12)}
              </Link>
            </HStack>
          </VStack>
          <VStack alignItems="start" as={GridItem}>
            <Text>To: </Text>
            <HStack>
              <Link
                as={NextLink}
                color={GetColor('textSelected')}
                marginEnd={2}
                href="#"
                display="flex"
                gap={2}
              >
                {truncateString(data.sellToStationDto.system.name, 15)}
              </Link>
              <Text fontStyle="italic" as="span">
                {`${Math.round(data.sellToStationDto.arrivalDistance)} ls`}
              </Text>
              <Icon
                marginEnd={2}
                as={FontAwesomeIcon}
                icon={faRightLong}
                size="lg"
              />
              <Link
                marginEnd={2}
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={2}
              >
                <RenderStationTypeIcon
                  station={data.sellToStationDto}
                  isDark={isDark}
                />
                {truncateString(data.sellToStationDto.name, 15)}
              </Link>
            </HStack>
          </VStack>
          <GridItem textAlign="center">
            <GridRowExpandIcon
              isExpanded={showItemCard}
              setIsExpanded={setShowItemCard}
              size={12}
            />
          </GridItem>
        </Grid>
      </HStack>
      {showItemCard && toggleItemCard()}
    </Flex>
  );
};

export default ResponseBody;
