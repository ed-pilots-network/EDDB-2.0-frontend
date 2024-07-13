import React, { useState } from 'react';

import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { formatThousands } from '@/app/_hooks/textFormatting';
import {
  Box,
  Button,
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

  const toggleItemCard = () => (
    <Box width="100%" boxShadow="2xl" roundedTop="md">
      <Card
        variant="unstyled"
        bg="inherit"
        direction="row"
        fontSize={{ base: 'xs', sm: 'sm' }}
        width="100%"
        backgroundColor={selectBgColor}
        overflowX="auto"
      >
        <CardBody lineHeight={2}>
          <Grid
            gridTemplateColumns={{ base: '1fr', md: '2fr 2fr' }}
            gridTemplateRows={'repreat(1fr)'}
            animation={`${expand} 0.2s linear`}
          >
            <Box
              alignItems="start"
              padding={2}
              as={GridItem}
              colSpan={{ base: 1, md: 2 }}
              gap={2}
              display="flex"
              flexFlow={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'left', md: 'center' }}
            >
              <HStack alignItems="baseline">
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
            </Box>
            <VStack
              alignItems="start"
              bg={selectBgColorAlt}
              padding={2}
              as={GridItem}
              width="100%"
            >
              <Text
                className={orbitron.className}
                fontWeight={700}
                letterSpacing={0.5}
                color={selectTextColorStrong}
                marginX="auto"
              >
                From
              </Text>
              <HStack overflowX="auto">
                <Link
                  as={NextLink}
                  color={selectTextColorStrong}
                  fontWeight={700}
                  href="#"
                  whiteSpace="nowrap"
                >
                  {truncateString(data.buyFromStationDto.system.name, 20)}
                </Link>
                <Link
                  color={GetColor('accent-text')}
                  href="#"
                  display="flex"
                  gap={2}
                  whiteSpace="nowrap"
                  alignItems="baseline"
                >
                  <Icon as={FontAwesomeIcon} icon={faRightLong} size="xs" />
                  <Text fontStyle="italic" as="span" fontSize="xs">
                    {`${Math.round(data.buyFromStationDto.arrivalDistance)} ls`}
                  </Text>
                  <RenderStationTypeIcon
                    station={data.buyFromStationDto}
                    isDark={isDark}
                  />
                  {truncateString(data.buyFromStationDto.name, 20)}
                </Link>
              </HStack>
              <HStack>
                <HStack alignItems="baseline">
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
              </HStack>
              <HStack alignItems="baseline">
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
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                  fontSize="xs"
                >
                  Updated:
                </Text>
                <Text color={selectTextColorAccent} fontSize="xs">
                  {calculateTimeDifference(
                    data.buyFromStationDto.marketUpdatedAt,
                  )}
                </Text>
              </HStack>
            </VStack>
            <VStack alignItems="start" padding={2} width="100%" as={GridItem}>
              <Text
                className={orbitron.className}
                fontWeight={700}
                letterSpacing={0.5}
                color={selectTextColorStrong}
                marginX="auto"
              >
                To
              </Text>
              <HStack>
                <Link
                  as={NextLink}
                  color={selectTextColorStrong}
                  fontWeight={700}
                  href="#"
                  whiteSpace="nowrap"
                >
                  {truncateString(data.sellToStationDto.system.name, 20)}
                </Link>
                <Link
                  color={GetColor('accent-text')}
                  href="#"
                  display="flex"
                  gap={2}
                  whiteSpace="nowrap"
                  alignItems="baseline"
                >
                  <Icon as={FontAwesomeIcon} icon={faRightLong} size="xs" />
                  <Text fontStyle="italic" as="span" fontSize="xs">
                    {`${Math.round(data.sellToStationDto.arrivalDistance)} ls`}
                  </Text>
                  <RenderStationTypeIcon
                    station={data.sellToStationDto}
                    isDark={isDark}
                  />
                  {truncateString(data.sellToStationDto.name, 20)}
                </Link>
              </HStack>
              <HStack alignItems="baseline">
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
              <HStack alignItems="baseline" minWidth="max-content">
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
                <Text
                  className={orbitron.className}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={selectTextColorAccent}
                  fontSize="xs"
                >
                  Updated:
                </Text>
                <Text color={selectTextColorAccent} fontSize="xs">
                  {calculateTimeDifference(
                    data.sellToStationDto.marketUpdatedAt,
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
          gridTemplateColumns={{ base: '70px 2fr', md: '70px 2fr 100px' }}
          gridTemplateRows={'1fr'}
          rowGap="1"
          paddingY={{ base: 2, md: 4 }}
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
              <Icon as={FontAwesomeIcon} icon={faRightLong} size="1x" />
              <Link
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={1}
                whiteSpace="nowrap"
                overflowX="hidden"
              >
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
              <Icon as={FontAwesomeIcon} icon={faRightLong} size="1x" />
              <Link
                color={GetColor('accent-text')}
                href="#"
                display="flex"
                gap={1}
                whiteSpace="nowrap"
                overflowX="hidden"
              >
                {truncateString(data.sellToStationDto.name, 12)}
              </Link>
            </HStack>
          </HStack>
          <Button
            display={{ base: 'inline', md: 'none' }}
            as={GridItem}
            colSpan={2}
            textAlign="center"
            paddingTop={2}
            variant="unstyled"
          >
            <GridRowExpandIcon
              isExpanded={showItemCard}
              setIsExpanded={setShowItemCard}
              size={8}
            />
          </Button>
          <Button
            display={{ base: 'none', md: 'block' }}
            position="absolute"
            right={20}
            marginTop={4}
            variant="unstyled"
            as={GridItem}
          >
            <GridRowExpandIcon
              isExpanded={showItemCard}
              setIsExpanded={setShowItemCard}
              size={12}
            />
          </Button>
        </Grid>
      </HStack>
      {showItemCard && toggleItemCard()}
    </Flex>
  );
};

export default ResponseBody;
