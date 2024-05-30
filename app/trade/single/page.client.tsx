'use client';

import { useState } from 'react';
import { Box, HStack, Flex } from '@chakra-ui/react';
import Form from '@/components/trade-routes/single/Form';
import GetColor from '@/app/_hooks/colorSelector';
import { ICommodity } from '@/app/_types';
import PageHeading from '@/app/_components/utility/pageHeading';
import { FormSubmitProps } from '@/app/_components/trade-routes/single/Schema';
import { useGetData } from '@/app/_lib/api-calls';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient = ({ commodities }: IPageClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestUrl, setRequestUrl] = useState('');

  const {
    data: responseData,
    error: responseError,
    mutate: responseMutate,
  } = useGetData(requestUrl);

  function encodeQueryString(obj: FormSubmitProps) {
    const params: string[] = [];
    Object.entries(obj).forEach(([k, v]) => {
      if (typeof v === 'undefined') return;
      if (typeof v === 'object') {
        if (!v) return;
        if (k.includes('commodity') && Array.isArray(v))
          v.map((commodity) =>
            params.push(`commodityDisplayNames=${commodity}`),
          );
        if (k.includes('sell') || k.includes('buy')) {
          if ('label' in v) params.push(`${k}=${v.label}`);
        }
        return;
      }
      params.push(`${k}=${v}`);
    });
    return params.toString().replaceAll(',', '&');
  }

  const handleSubmit = async (data: FormSubmitProps) => {
    setIsLoading(true);

    const queryParams = encodeQueryString(data);
    const queryUrl = `trade/locate-trade/single?${queryParams}`;
    setRequestUrl(queryUrl);
    if (requestUrl !== '') await responseMutate();

    // TODO: we'll use availableCredits with cargoCapacity to present overall profit
    // once the response returns with profit per
    // includeOdyssey isn't being filtered atm
    // const includeOdyssey = data.includeOdyssey;
    // const availableCredits = data.availableCredits;

    // TODO: format and submit data to backend
    const res = responseError ?? responseData;
    console.log('response', res);
    setIsLoading(false);
  };

  return (
    <Flex flexDirection="column" gap="24px" width="100%">
      <HStack spacing={4}>
        <PageHeading heading="Single Trade Route Finder" />
      </HStack>
      <Box
        borderWidth="2px"
        borderRadius="9px"
        borderColor={GetColor('border')}
        padding="1rem"
      >
        <Form
          onSubmitHandler={handleSubmit}
          isLoading={isLoading}
          commodities={commodities}
        />
      </Box>
    </Flex>
  );
};

export default PageClient;
