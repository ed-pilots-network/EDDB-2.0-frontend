import { Box, Flex, Heading } from '@chakra-ui/react';
import GetColor from '@/app/_hooks/colorSelector';
import { orbitron } from '@/app/_config/theme/fonts';

const PageHeading = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading?: string;
}) => {
  const subHeading = () => (
    <Box alignSelf="baseline">
      <Heading
        as="h2"
        size={{ base: 'xs', md: 'sm', lg: 'sm' }}
        marginX={{ base: 'auto', md: '0', lg: '0' }}
        textAlign={{ base: 'center', sm: 'left', md: 'left' }}
        className={orbitron.className}
      >
        {subheading}
      </Heading>
    </Box>
  );

  return (
    <Flex direction="column" gap={2}>
      <Box alignSelf="baseline">
        <Heading
          as="h1"
          size={{ base: 'md', md: 'lg', lg: 'lg' }}
          marginX={{ base: 'auto', md: '0', lg: '0' }}
          color={GetColor('accent-text')}
          className={orbitron.className}
        >
          {heading}
        </Heading>
      </Box>
      {subheading && subHeading()}
    </Flex>
  );
};

export default PageHeading;
