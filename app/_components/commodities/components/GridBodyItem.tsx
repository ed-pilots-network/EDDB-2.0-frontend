import React from 'react';

import { formatThousands } from '@/app/_hooks/textFormatting';
import { GridItem, SimpleGrid, Text } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import { RenderStationTypeIcon } from '../../utility/common-components';
import { calculateTimeDifference } from '../../utility/common-functions';
import type { ICommodityFormResponse } from '@/types/index';

interface IGridBodyItemProps {
  isDark: boolean;
  commodity: ICommodityFormResponse;
  isBuying: boolean;
}

const GridBodyItem: React.FC<IGridBodyItemProps> = ({
  isDark,
  commodity,
  isBuying,
}) => (
  <SimpleGrid
    columns={[5, 7]}
    width="100%"
    minChildWidth="130px"
    fontSize="sm"
    _odd={{
      background: `${GetColor('grid-accent')}`,
      borderRadius: 'md',
    }}
    padding={2}
    height={10}
  >
    <GridItem>
      CR{' '}
      {isBuying
        ? formatThousands(commodity.sellPrice)
        : formatThousands(commodity.buyPrice)}
    </GridItem>
    <GridItem>
      {isBuying
        ? formatThousands(commodity.supply)
        : formatThousands(commodity.demand)}
    </GridItem>
    <GridItem>
      <Text maxWidth="130px" overflowX="scroll" whiteSpace="nowrap">
        {commodity.station.system.name}
      </Text>
    </GridItem>
    <GridItem
      display="flex"
      flexWrap="nowrap"
      columnGap={1}
      hideBelow="md"
      marginY="auto"
      maxWidth="90%"
    >
      <RenderStationTypeIcon station={commodity.station} isDark={isDark} />
      <Text overflowX="scroll" whiteSpace="nowrap">
        {commodity.station.name}
      </Text>
    </GridItem>
    <GridItem hideBelow="lg">
      {formatThousands(commodity.station.arrivalDistance)} ls
    </GridItem>
    <GridItem>{formatThousands(commodity.distance)} ly</GridItem>
    <GridItem>{calculateTimeDifference(commodity.priceUpdatedAt)}</GridItem>
  </SimpleGrid>
);

export default GridBodyItem;
