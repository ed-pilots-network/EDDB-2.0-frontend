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
import { orbitron } from '@/app/_config/theme/fonts';
import type { FormResponseProps } from '../../Schema';

const ResponseBody = ({
  index,
  data,
  cargoCapacity,
}: {
  index: number;
  data: FormResponseProps;
  cargoCapacity: number;
}) => {
  const [showItemCard, setShowItemCard] = useState(false);
  const { isDark } = useColorMode();

  const expand = keyframes`
      from {transform: translateY(-150px);}
      to {transform: translateY(0);}
    `;

  const bgColorTern = isDark ? 'black.3' : 'blue.1';
  const bgColorTern1 = isDark ? 'blue.8' : 'blue.2';
  const selectBgColor = index % 2 ? bgColorTern : bgColorTern1;

  const bgColorTern2 = isDark ? 'black.1' : 'blue.2';
  const bgColorTern3 = isDark ? 'blue.7' : 'blue.3';
  const selectBgColorAlt = index % 2 ? bgColorTern2 : bgColorTern3;

  const selectTextColorAccent = isDark ? 'blue.4' : 'brown.5';
  const selectTextColorStrong = isDark ? 'orange.3' : 'brown.5';

  const calcMaxTrades = (supply: number, demand: number) => {
    const supplyRatioToCargo = Math.round(supply / cargoCapacity);
    const demandRatioToCargo = Math.round(demand / cargoCapacity);
    const min = Math.min(supplyRatioToCargo, demandRatioToCargo);
    if (min > 1) return `${min} trades`;
    return `${min} trade`;
  };

  const toggleItemCard = () => (
    <Box overflow="hidden" width="100%" boxShadow="2xl" roundedTop="md">
      <Card
        variant="unstyled"
        bg="inherit"
        direction={{ base: 'column', sm: 'row' }}
        fontSize="sm"
        size="sm"
        width="100%"
        backgroundColor={selectBgColor}
      >
        <CardBody lineHeight={2}>
          <Grid gridTemplateColumns={'2fr 4fr 4fr 1fr'} rowGap="1" width="100%">
            <VStack
              alignItems="start"
              padding={4}
              justifyContent="center"
              animation={`${expand} 0.2s linear`}
            >
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Max Trades:{' '}
                </Text>
                <Text color={selectTextColorAccent}>
                  {calcMaxTrades(data.stock, data.demand)}
                </Text>
              </HStack>
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Profit Per:{' '}
                </Text>
                <Text color={selectTextColorAccent}>{`${formatThousands(
                  data.profit,
                )} cr`}</Text>
              </HStack>
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Commodity:
                </Text>
                <Text color={selectTextColorAccent}>
                  {data.commodityDto.displayName}
                </Text>
              </HStack>
            </VStack>
            <HStack
              backgroundColor={selectBgColorAlt}
              justifyContent="space-between"
            >
              <VStack
                alignItems="start"
                padding={4}
                animation={`${expand} 0.2s linear`}
              >
                <HStack>
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Supply:{' '}
                  </Text>
                  <Text color={selectTextColorAccent}>{`${formatThousands(
                    data.stock,
                  )} units`}</Text>
                </HStack>
                <HStack>
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Buy Price:{' '}
                  </Text>
                  <Text color={selectTextColorAccent}>{`${formatThousands(
                    data.buyPrice,
                  )} cr`}</Text>
                </HStack>
                <HStack>
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Last Updated:
                  </Text>
                  <Text color={selectTextColorAccent}>
                    {calculateTimeDifference(
                      data.buyFromStationDto.marketUpdateAt,
                    )}
                  </Text>
                </HStack>
              </VStack>
              <Box
                borderTop={`75px solid`}
                borderTopColor={selectBgColor}
                borderLeft={`55px solid`}
                borderLeftColor={selectBgColorAlt}
                borderBottom={`75px solid`}
                borderBottomColor={selectBgColor}
              />
            </HStack>
            <VStack
              alignItems="start"
              justifyContent="center"
              padding={4}
              animation={`${expand} 0.2s linear`}
            >
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Demand:{' '}
                </Text>
                <Text color={selectTextColorAccent}>{`${formatThousands(
                  data.demand,
                )} units`}</Text>
              </HStack>
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Sell Price:{' '}
                </Text>
                <Text color={selectTextColorAccent}>{`${formatThousands(
                  data.sellPrice,
                )} cr`}</Text>
              </HStack>
              <HStack>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Last Updated:
                </Text>
                <Text color={selectTextColorAccent}>
                  {calculateTimeDifference(
                    data.sellToStationDto.marketUpdateAt,
                  )}
                </Text>
              </HStack>
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
              <Text className={orbitron.className}>Profit: </Text>
              <Text color={selectTextColorAccent} fontWeight="700">
                {` ${formatThousands(data.profit * cargoCapacity)} cr`}
              </Text>
            </HStack>
          </VStack>
          <VStack alignItems="start" as={GridItem}>
            <Text className={orbitron.className} fontWeight={700}>
              From:{' '}
            </Text>
            <HStack>
              <Link
                as={NextLink}
                color={selectTextColorStrong}
                fontWeight={700}
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
            <Text className={orbitron.className} fontWeight={700}>
              To:
            </Text>
            <HStack>
              <Link
                as={NextLink}
                color={selectTextColorStrong}
                fontWeight={700}
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
