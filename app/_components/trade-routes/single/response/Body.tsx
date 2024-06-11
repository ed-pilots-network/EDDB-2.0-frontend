import React from 'react';

import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { formatThousands } from '@/app/_hooks/textFormatting';
import { Grid, GridItem, HStack, Icon, Link, Text } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import { RenderStationTypeIcon } from '@/components/utility/common-components';
import useColorMode from '@/app/_hooks/useColorMode';
import type { FormResponseProps } from '../Schema';

const ResponseBody = ({
  data,
  cargoCapacity,
}: {
  data: FormResponseProps;
  cargoCapacity: number;
}) => {
  const { isDark } = useColorMode();
  return (
    <Grid
      gridTemplateColumns={'90px 120px 1fr 3fr 3fr 100px'}
      rowGap="1"
      width="100%"
      fontSize="sm"
      _odd={{
        background: `${GetColor('grid-accent')}`,
        borderRadius: 'md',
      }}
      padding={2}
      height={10}
    >
      <GridItem fontStyle="italic">
        {`${Math.round(+formatThousands(data.routeDistance))} ly`}
      </GridItem>
      <GridItem>
        <Text as="span" color={GetColor('border-accent')}>
          {` ${formatThousands(cargoCapacity * data.profit)} cr`}
        </Text>
      </GridItem>
      <GridItem fontStyle="italic">{data.commodityDto.displayName}</GridItem>
      <HStack as={GridItem} overflowX="scroll" whiteSpace="nowrap">
        <Link
          as={NextLink}
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
          {` ${data.buyFromStationDto.system.name}`}
        </Link>
        <Text fontStyle="italic" as="span">
          {`${Math.round(data.buyFromStationDto.arrivalDistance)} ls`}
        </Text>
        <Icon marginEnd={2} as={FontAwesomeIcon} icon={faArrowRight} />
        <Link
          marginEnd={2}
          color={GetColor('textSelected')}
          href="#"
          display="flex"
          gap={2}
        >
          <RenderStationTypeIcon
            station={data.buyFromStationDto}
            isDark={isDark}
          />
          {` ${data.buyFromStationDto.name}`}
        </Link>
      </HStack>
      <HStack as={GridItem} overflowX="scroll" whiteSpace="nowrap">
        <Link
          as={NextLink}
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
          {` ${data.sellToStationDto.system.name}`}
        </Link>
        <Text fontStyle="italic" as="span">
          {`${Math.round(data.sellToStationDto.arrivalDistance)} ls`}
        </Text>
        <Icon marginEnd={2} as={FontAwesomeIcon} icon={faArrowRight} />
        <Link
          marginEnd={2}
          color={GetColor('textSelected')}
          href="#"
          display="flex"
          gap={2}
        >
          <RenderStationTypeIcon
            station={data.sellToStationDto}
            isDark={isDark}
          />
          {` ${data.sellToStationDto.name}`}
        </Link>
      </HStack>
    </Grid>
  );
};

export default ResponseBody;
