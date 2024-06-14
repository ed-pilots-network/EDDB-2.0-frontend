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

  const selectTextColorAccent = isDark ? 'blue.3' : 'brown.5';
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
        direction="row"
        fontSize="xs"
        width="100%"
        backgroundColor={selectBgColor}
      >
        <CardBody lineHeight={2}>
          <Grid
            gridTemplateColumns={'1fr'}
            gridTemplateRows={'repreat(1fr)'}
            width="100%"
            animation={`${expand} 0.2s linear`}
          >
            <VStack alignItems="start" padding={2}>
              <HStack alignItems="baseline" as={GridItem}>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Max Trades:{' '}
                </Text>
                <Text color={selectTextColorAccent} fontSize="sm">
                  {calcMaxTrades(data.stock, data.demand)}
                </Text>
              </HStack>
              <HStack alignItems="baseline" as={GridItem}>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Profit Per:{' '}
                </Text>
                <Text
                  color={selectTextColorAccent}
                  fontSize="sm"
                >{`${formatThousands(data.profit)} cr`}</Text>
              </HStack>
              <HStack alignItems="baseline" as={GridItem}>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Commodity:
                </Text>
                <Text color={selectTextColorAccent} fontSize="sm">
                  {data.commodityDto.displayName}
                </Text>
              </HStack>
            </VStack>
            <VStack alignItems="start" bg={selectBgColorAlt} padding={2}>
              <Text
                className={orbitron.className}
                fontWeight={700}
                letterSpacing={0.5}
                color={selectTextColorStrong}
                as={GridItem}
                marginX="auto"
              >
                From
              </Text>
              <HStack as={GridItem}>
                <Link
                  as={NextLink}
                  color={selectTextColorStrong}
                  fontWeight={700}
                  fontSize="sm"
                  href="#"
                  whiteSpace="nowrap"
                  overflowX="hidden"
                >
                  {truncateString(data.buyFromStationDto.system.name, 20)}
                </Link>
                <Link
                  color={GetColor('accent-text')}
                  href="#"
                  display="flex"
                  fontSize="sm"
                  gap={2}
                  whiteSpace="nowrap"
                  overflowX="hidden"
                >
                  <RenderStationTypeIcon
                    station={data.buyFromStationDto}
                    isDark={isDark}
                  />
                  {truncateString(data.buyFromStationDto.name, 20)}
                </Link>
              </HStack>
              <HStack as={GridItem}>
                <HStack alignItems="baseline">
                  <Text
                    className={orbitron.className}
                    fontWeight={700}
                    letterSpacing={0.5}
                    color={selectTextColorAccent}
                  >
                    Supply:{' '}
                  </Text>
                  <Text
                    color={selectTextColorAccent}
                    fontSize="sm"
                  >{`${formatThousands(data.stock)} units`}</Text>
                </HStack>
              </HStack>
              <HStack alignItems="baseline" as={GridItem}>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Buy Price:{' '}
                </Text>
                <Text
                  color={selectTextColorAccent}
                  fontSize="sm"
                >{`${formatThousands(data.buyPrice)} cr`}</Text>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Updated:
                </Text>
                <Text color={selectTextColorAccent} fontSize="sm">
                  {calculateTimeDifference(
                    data.buyFromStationDto.marketUpdateAt,
                  )}
                </Text>
              </HStack>
            </VStack>
            <VStack alignItems="start" padding={2}>
              <Text
                className={orbitron.className}
                fontWeight={700}
                letterSpacing={0.5}
                color={selectTextColorStrong}
                as={GridItem}
                marginX="auto"
              >
                To
              </Text>
              <HStack as={GridItem}>
                <Link
                  as={NextLink}
                  color={selectTextColorStrong}
                  fontWeight={700}
                  fontSize="sm"
                  href="#"
                  whiteSpace="nowrap"
                  overflowX="hidden"
                >
                  {truncateString(data.sellToStationDto.system.name, 20)}
                </Link>
                <Link
                  color={GetColor('accent-text')}
                  href="#"
                  display="flex"
                  fontSize="sm"
                  gap={2}
                  whiteSpace="nowrap"
                  overflowX="hidden"
                >
                  <RenderStationTypeIcon
                    station={data.sellToStationDto}
                    isDark={isDark}
                  />
                  {truncateString(data.sellToStationDto.name, 20)}
                </Link>
              </HStack>
              <HStack alignItems="baseline" as={GridItem}>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Demand:{' '}
                </Text>
                <Text
                  color={selectTextColorAccent}
                  fontSize="sm"
                >{`${formatThousands(data.demand)} units`}</Text>
              </HStack>
              <HStack
                alignItems="baseline"
                as={GridItem}
                minWidth="max-content"
              >
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Sell Price:{' '}
                </Text>
                <Text
                  color={selectTextColorAccent}
                  fontSize="sm"
                >{`${formatThousands(data.sellPrice)} cr`}</Text>
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                >
                  Updated:
                </Text>
                <Text color={selectTextColorAccent} fontSize="sm">
                  {calculateTimeDifference(
                    data.sellToStationDto.marketUpdateAt,
                  )}
                </Text>
              </HStack>
            </VStack>
            {/* <HStack */}
            {/*   backgroundColor={selectBgColorAlt} */}
            {/*   justifyContent="space-between" */}
            {/* > */}
            {/*   <HStack */}
            {/*     alignItems="start" */}
            {/*     padding={4} */}
            {/*     animation={`${expand} 0.2s linear`} */}
            {/*   ></HStack> */}
            {/*   <Box */}
            {/*     borderTop={`75px solid`} */}
            {/*     borderTopColor={selectBgColor} */}
            {/*     borderLeft={`55px solid`} */}
            {/*     borderLeftColor={selectBgColorAlt} */}
            {/*     borderBottom={`75px solid`} */}
            {/*     borderBottomColor={selectBgColor} */}
            {/*   /> */}
            {/* </HStack> */}
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
      }}
      borderRadius="md"
      borderColor={GetColor('border')}
      border={showItemCard ? `1px solid` : 'none'}
      overflowX="auto"
    >
      <HStack>
        <Grid
          gridTemplateColumns={{ base: '70px 2fr', md: '70px 2fr 1fr' }}
          gridTemplateRows={'1fr'}
          rowGap="1"
          paddingY={4}
          paddingX={2}
          width="100%"
        >
          <GridItem fontStyle="italic" fontWeight="700">
            {`${Math.round(+formatThousands(data.routeDistance))} ly`}
          </GridItem>
          <HStack as={GridItem} marginLeft={{ base: 0, sm: '25%' }}>
            <HStack minWidth="max-content">
              <Text className={orbitron.className}>Profit: </Text>
              <Text color={selectTextColorAccent} fontWeight="700">
                {` ${formatThousands(cargoCapacity * data.profit)} cr`}
              </Text>
            </HStack>
          </HStack>
          <GridItem display={{ base: 'none', md: 'block' }} />
          <GridItem fontStyle="italic" fontWeight="700">
            <Text className={orbitron.className} fontWeight={700}>
              From:{' '}
            </Text>
          </GridItem>
          <HStack as={GridItem} marginLeft={{ base: 0, sm: '25%' }}>
            <HStack minWidth="max-content">
              <Link
                as={NextLink}
                color={selectTextColorStrong}
                fontWeight={700}
                href="#"
                whiteSpace="nowrap"
                overflowX="hidden"
              >
                {truncateString(data.buyFromStationDto.system.name, 12)}
              </Link>
              {/* <Text fontStyle="italic" as="span"> */}
              {/*   {`${Math.round(data.buyFromStationDto.arrivalDistance)} ls`} */}
              {/* </Text> */}
              <Icon as={FontAwesomeIcon} icon={faRightLong} size="1x" />
              <Link
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={1}
                whiteSpace="nowrap"
                overflowX="hidden"
              >
                {/* <RenderStationTypeIcon */}
                {/*   station={data.buyFromStationDto} */}
                {/*   isDark={isDark} */}
                {/* /> */}
                {truncateString(data.buyFromStationDto.name, 12)}
              </Link>
            </HStack>
          </HStack>
          <GridItem display={{ base: 'none', md: 'block' }} />
          <GridItem fontStyle="italic" fontWeight="700">
            <Text className={orbitron.className} fontWeight={700}>
              To:
            </Text>
          </GridItem>
          <HStack as={GridItem} marginLeft={{ base: 0, sm: '25%' }}>
            <HStack minWidth="max-content">
              <Link
                as={NextLink}
                color={selectTextColorStrong}
                fontWeight={700}
                href="#"
                whiteSpace="nowrap"
                overflowX="hidden"
              >
                {truncateString(data.sellToStationDto.system.name, 12)}
              </Link>
              {/* <Text fontStyle="italic" as="span"> */}
              {/*   {`${Math.round(data.sellToStationDto.arrivalDistance)} ls`} */}
              {/* </Text> */}
              <Icon as={FontAwesomeIcon} icon={faRightLong} size="1x" />
              <Link
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={1}
                whiteSpace="nowrap"
                overflowX="hidden"
              >
                {/* <RenderStationTypeIcon */}
                {/*   station={data.sellToStationDto} */}
                {/*   isDark={isDark} */}
                {/* /> */}
                {truncateString(data.sellToStationDto.name, 12)}
              </Link>
            </HStack>
          </HStack>
          <GridItem
            justifyContent="center"
            display={{ base: 'none', md: 'flex' }}
            position="absolute"
            right={28}
            marginTop={4}
          >
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
