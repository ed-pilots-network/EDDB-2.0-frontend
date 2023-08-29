import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowsUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { Button, GridItem, Icon, SimpleGrid } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';

interface IGridHeadingsProps {
  filter: string;
  isBuying: boolean;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

const GridHeadings: React.FC<IGridHeadingsProps> = ({
  filter,
  isBuying,
  setFilter,
  ascending,
  setAscending,
}) => {
  const gridHeadings: {
    id: number;
    text: string;
    sortByString: string | null;
  }[] = [
    { id: 0, text: 'Sell Price', sortByString: 'sellPrice' },
    { id: 1, text: 'Buy Price', sortByString: 'buyPrice' },
    { id: 2, text: 'Supply', sortByString: 'supply' },
    { id: 3, text: 'Demand', sortByString: 'demand' },
    { id: 4, text: 'System', sortByString: null },
    { id: 5, text: 'Station', sortByString: null },
    { id: 6, text: 'Station Distance', sortByString: null },
    { id: 7, text: 'Distance', sortByString: 'distance' },
    { id: 8, text: 'Latest Update', sortByString: null },
  ];

  const unnecessaryHeadings = (newFilter: string | null) => {
    if (isBuying && newFilter === 'buyPrice') return true;
    if (isBuying && newFilter === 'demand') return true;
    if (!isBuying && newFilter === 'sellPrice') return true;
    if (!isBuying && newFilter === 'supply') return true;
    return false;
  };

  const renderArrowIcon = (newFilter: string) => {
    if (filter === newFilter) {
      return ascending ? (
        <Icon as={FontAwesomeIcon} icon={faArrowDown} />
      ) : (
        <Icon as={FontAwesomeIcon} icon={faArrowUp} />
      );
    }
    return <Icon as={FontAwesomeIcon} icon={faArrowsUpDown} />;
  };

  return (
    <SimpleGrid
      columns={[5, 7]}
      width="100%"
      fontWeight="bold"
      borderBottom="1px"
      borderColor={GetColor('border')}
      rowGap={1}
    >
      {gridHeadings.map((heading) => {
        if (unnecessaryHeadings(heading.sortByString)) return null;
        if (!heading.sortByString) {
          return (
            <GridItem display="flex" alignItems="center" key={heading.id}>
              {heading.text}
            </GridItem>
          );
        }
        return (
          <GridItem display="flex" alignItems="center" key={heading.id}>
            <Button
              variant="unstyled"
              display="flex"
              gap={1}
              onClick={() => {
                setFilter(heading.sortByString);
                setAscending(!ascending);
              }}
            >
              {heading.text}
              {renderArrowIcon(heading.sortByString)}
            </Button>
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
};

export default GridHeadings;
