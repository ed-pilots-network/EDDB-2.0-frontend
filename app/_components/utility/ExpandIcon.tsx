import React from 'react';
import { Button, HStack, Text, keyframes } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

interface ExpandIconProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandIcon = ({ isExpanded, setIsExpanded }: ExpandIconProps) => {
  const rotate = keyframes`
      from {transform: rotate(180deg);}
      to {transform: rotate(360deg);}
    `;

  return (
    <Button onClick={() => setIsExpanded(!isExpanded)} variant="unstyled">
      {isExpanded ? (
        <HStack>
          <Text color="orange.3">Options</Text>
          <ChevronUpIcon
            boxSize={10}
            color="orange.3"
            animation={`${rotate} 0.3s linear`}
          />
        </HStack>
      ) : (
        <HStack>
          <Text color="orange.3">Options</Text>
          <ChevronDownIcon
            boxSize={10}
            color="orange.3"
            animation={`${rotate} 0.3s linear`}
          />
        </HStack>
      )}
    </Button>
  );
};

export default ExpandIcon;
