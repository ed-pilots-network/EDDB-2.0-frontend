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
} from '@/app/_components/utility/common-components';
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
      from {
          transform: translateY(-150px);
      }
      to {
          transform: translateY(0);
      }
  `;

  const bgColorTern = isDark ? 'black.3' : 'blue.1';
  const bgColorTern1 = isDark ? 'blue.8' : 'blue.2';
  const selectBgColor = index % 2 ? bgColorTern : bgColorTern1;

  const bgColorTern2 = isDark ? 'black.1' : 'blue.2';
  const bgColorTern3 = isDark ? 'blue.7' : 'blue.3';
  const selectBgColorAlt = index % 2 ? bgColorTern2 : bgColorTern3;

  const selectTextColorAccent = isDark ? 'blue.4' : 'brown.5';
  const selectTextColorStrong = isDark ? 'orange.3' : 'brown.5';

  const toggleItemCard = () => (
    <Box overflow="hidden" width="100%" boxShadow="2xl" roundedTop="md">
      <VStack>
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
            <Grid
              gridTemplateColumns={'2fr 4fr 4fr 1fr'}
              rowGap="1"
              width="100%"
            >
              <VStack
                alignItems="start"
                padding={4}
                justifyContent="center"
                animation={`${expand} 0.2s linear`}
                as={GridItem}
              >
                <HStack width="max-content">
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Profit Per:{' '}
                  </Text>
                  <Text color={selectTextColorAccent}>{`${formatThousands(
                    data.firstTrip.profit,
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
                    {data.firstTrip.commodityDto.displayName}
                  </Text>
                </HStack>
              </VStack>
              <HStack
                backgroundColor={selectBgColorAlt}
                justifyContent="space-between"
                as={GridItem}
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
                      data.firstTrip.stock,
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
                      data.firstTrip.buyPrice,
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
                        data.firstTrip.buyFromStationDto.marketUpdatedAt,
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
                as={GridItem}
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
                    data.firstTrip.demand,
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
                    data.firstTrip.sellPrice,
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
                      data.firstTrip.sellToStationDto.marketUpdatedAt,
                    )}
                  </Text>
                </HStack>
              </VStack>
            </Grid>
          </CardBody>
        </Card>
        <Card
          variant="unstyled"
          bg="inherit"
          direction={{ base: 'column', sm: 'row' }}
          fontSize="sm"
          size="sm"
          width="100%"
          backgroundColor={selectBgColorAlt}
        >
          <CardBody lineHeight={2}>
            <Grid
              gridTemplateColumns={'2fr 4fr 4fr 1fr'}
              rowGap="1"
              width="100%"
            >
              <VStack
                alignItems="start"
                padding={4}
                justifyContent="center"
                animation={`${expand} 0.2s linear`}
                as={GridItem}
              >
                <HStack width="max-content">
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Profit Per:{' '}
                  </Text>
                  <Text color={selectTextColorAccent}>{`${formatThousands(
                    data.returnTrip.profit,
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
                    {data.returnTrip.commodityDto.displayName}
                  </Text>
                </HStack>
              </VStack>
              <HStack
                backgroundColor={selectBgColor}
                justifyContent="space-between"
                as={GridItem}
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
                      data.returnTrip.stock,
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
                      data.returnTrip.buyPrice,
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
                        data.returnTrip.buyFromStationDto.marketUpdatedAt,
                      )}
                    </Text>
                  </HStack>
                </VStack>
                <Box
                  borderTop={`75px solid`}
                  borderTopColor={selectBgColor}
                  borderRight={`55px solid`}
                  borderRightColor={selectBgColorAlt}
                  borderBottom={`75px solid`}
                  borderBottomColor={selectBgColor}
                />
              </HStack>
              <VStack
                alignItems="start"
                justifyContent="center"
                padding={4}
                animation={`${expand} 0.2s linear`}
                as={GridItem}
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
                    data.returnTrip.demand,
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
                    data.returnTrip.sellPrice,
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
                      data.returnTrip.sellToStationDto.marketUpdatedAt,
                    )}
                  </Text>
                </HStack>
              </VStack>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );

  return (
    <Flex
      width="100%"
      fontSize="sm"
      flexFlow="column"
      onClick={() => setShowItemCard(!showItemCard)}
      _even={{
        background: `${GetColor('grid-accent')}`,
      }}
      borderRadius="md"
      borderColor={GetColor('border')}
      border={showItemCard ? `1px solid` : 'none'}
      overflowX="auto"
      boxShadow="md"
    >
      <HStack>
        <Grid
          gridTemplateColumns={'2fr 4fr 4fr 1fr'}
          rowGap="1"
          padding={4}
          width="100%"
        >
          <VStack alignItems="start" as={GridItem}>
            <HStack>
              <Text className={orbitron.className}>Route Length: </Text>
              <Text fontStyle="italic" fontWeight="700">
                {`${Math.round(
                  +formatThousands(data.firstTrip.routeDistance),
                )} ly`}
              </Text>
            </HStack>
            <HStack>
              <Text className={orbitron.className}>Total Profit Per: </Text>
              <Text color={selectTextColorAccent} fontWeight="700">
                {` ${formatThousands(
                  (data.firstTrip.profit + data.returnTrip.profit) *
                    cargoCapacity,
                )} cr`}
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
                {truncateString(
                  data.firstTrip.buyFromStationDto.system.name,
                  15,
                )}
              </Link>
              <Text fontStyle="italic" as="span">
                {`${Math.round(
                  data.firstTrip.buyFromStationDto.arrivalDistance,
                )} ls`}
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
                  station={data.firstTrip.buyFromStationDto}
                  isDark={isDark}
                />
                {truncateString(data.firstTrip.buyFromStationDto.name, 12)}
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
                {truncateString(
                  data.firstTrip.sellToStationDto.system.name,
                  15,
                )}
              </Link>
              <Text fontStyle="italic" as="span">
                {`${Math.round(
                  data.firstTrip.sellToStationDto.arrivalDistance,
                )} ls`}
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
                  station={data.firstTrip.sellToStationDto}
                  isDark={isDark}
                />
                {truncateString(data.firstTrip.sellToStationDto.name, 15)}
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
