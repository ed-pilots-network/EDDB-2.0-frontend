import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { formatThousands } from '@/app/_hooks/textFormatting';
import { Flex, Icon, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { ICommodityFormResponse } from '@/app/_types/commodity';
import { RenderStationTypeIcon } from '@/components/utility/common-components';
import { calculateTimeDifference } from '@/components/utility/common-functions';
import GetColor from '@/app/_hooks/colorSelector';

interface IGridBodyItemProps {
  isDark: boolean;
  commodity: ICommodityFormResponse;
  isBuying: boolean;
}

const GridBodyItemMobile: React.FC<IGridBodyItemProps> = ({
  isDark,
  commodity,
  isBuying,
}) => {
  const [showItemCard, setShowItemCard] = useState(false);

  const toggleItemCard = () => (
    <Tr fontSize="sm" borderBottomRadius="10px">
      <Td colSpan={4} lineHeight={2}>
        <Text>System Name: {commodity.station.system.name}</Text>
        <Text>Station Name: {commodity.station.name}</Text>
        <Flex gap={2}>
          Station Type:
          <RenderStationTypeIcon station={commodity.station} isDark={isDark} />
        </Flex>
        <Text>
          Arrival Distance: {commodity.station.arrivalDistance ?? '?'} ls
        </Text>
        <Text>
          Last Updated: {calculateTimeDifference(commodity.priceUpdatedAt)}
        </Text>
      </Td>
    </Tr>
  );

  return (
    <Tbody
      cursor="pointer"
      onClick={() => setShowItemCard(!showItemCard)}
      _odd={{
        background: `${GetColor('grid-accent')}`,
      }}
    >
      <Tr height={10}>
        <Td>
          <Text>
            {showItemCard ? (
              <Icon
                as={FontAwesomeIcon}
                icon={faArrowDown}
                marginRight={1}
                boxSize={3}
              />
            ) : (
              <Icon
                as={FontAwesomeIcon}
                icon={faArrowUp}
                marginRight={1}
                boxSize={3}
              />
            )}
            {isBuying
              ? formatThousands(commodity.sellPrice)
              : formatThousands(commodity.buyPrice)}
          </Text>
        </Td>
        <Td>
          {isBuying
            ? formatThousands(commodity.supply)
            : formatThousands(commodity.demand)}
        </Td>
        <Td>
          <Text maxWidth="130px" overflowX="scroll">
            {commodity.station.system.name}
          </Text>
        </Td>
        <Td>{formatThousands(commodity.distance)} ly</Td>
      </Tr>
      {showItemCard && toggleItemCard()}
    </Tbody>
  );
};

export default GridBodyItemMobile;
