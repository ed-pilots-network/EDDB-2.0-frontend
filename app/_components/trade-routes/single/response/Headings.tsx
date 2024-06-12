import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowsUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';

interface IGridHeadingsProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponseHeadings: React.FC<IGridHeadingsProps> = ({
  filter,
  setFilter,
  ascending,
  setAscending,
}) => {
  const gridHeadings: {
    id: number;
    text: string;
    sortByString: string | null;
    hideBelow: string;
  }[] = [
    { id: 0, text: 'Distance', sortByString: 'routeDistance', hideBelow: '' },
    { id: 1, text: 'Profit', sortByString: 'profit', hideBelow: '' },
    { id: 2, text: 'Commodity', sortByString: null, hideBelow: '' },
    { id: 3, text: 'From', sortByString: null, hideBelow: '' },
    { id: 5, text: 'To', sortByString: null, hideBelow: '' },
  ];

  const renderArrowIcon = (newFilter: string) => {
    if (filter === newFilter) {
      return ascending ? (
        <Icon as={FontAwesomeIcon} icon={faArrowDown} boxSize={3} />
      ) : (
        <Icon as={FontAwesomeIcon} icon={faArrowUp} boxSize={3} />
      );
    }
    return <Icon as={FontAwesomeIcon} icon={faArrowsUpDown} boxSize={3} />;
  };

  return (
    <Grid
      gridTemplateColumns={'30px 90px 120px 1fr 3fr 3fr 100px'}
      rowGap="1"
      width="100%"
      fontSize="sm"
      fontWeight="bold"
      borderColor={GetColor('border')}
      padding={2}
      height={10}
    >
      {gridHeadings.map((heading) => {
        if (!heading.sortByString) {
          return (
            <GridItem
              display="flex"
              alignItems="center"
              key={heading.id}
              fontSize="sm"
              hideBelow={heading.hideBelow}
            >
              {heading.text}
            </GridItem>
          );
        }
        return (
          <GridItem
            display="flex"
            alignItems="center"
            key={heading.id}
            hideBelow={heading.hideBelow}
          >
            <Button
              variant="unstyled"
              display="flex"
              fontSize="sm"
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
    </Grid>
  );
};

export default ResponseHeadings;
