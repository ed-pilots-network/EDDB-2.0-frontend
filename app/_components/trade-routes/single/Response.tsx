import { Heading, Text } from '@chakra-ui/react';
import { FormResponseProps } from './Schema';

const Response = ({ results }: { results: FormResponseProps[] }) => (
  <>
    <Heading as="h2" fontSize="2xl">
      Response
    </Heading>
    <Text>Number of results: {results.length}</Text>
  </>
);

export default Response;
