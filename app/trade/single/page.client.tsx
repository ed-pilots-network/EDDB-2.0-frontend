'use client';

import { useState } from 'react';
import { Box, HStack, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import Form from '@/components/trade-routes/single/Form';
import GetColor from '@/app/_hooks/colorSelector';
import PageHeading from '@/app/_components/utility/pageHeading';
import { useGetData } from '@/app/_lib/api-calls';
import {
  FormResponseProps,
  FormSubmitProps,
} from '@/app/_components/trade-routes/single/Schema';
// import Response from '@/app/_components/trade-routes/single/Response';
import SingleTradeResponseDesktop from '@/app/_components/trade-routes/single/response/ResponseDesktop';
import type { ICommodity } from '@/app/_types';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient = ({ commodities }: IPageClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestUrl, setRequestUrl] = useState('');
  const [cargoCapacity, setCargoCapacity] = useState(1);
  const [isLarge] = useMediaQuery('(min-width: 1024px)');

  const {
    data: responseData,
    error: responseError,
    mutate: responseMutate,
  } = useGetData<FormResponseProps[]>(requestUrl);

  // TODO: this is messy. can it be made universal and extracted?
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

  // TODO: delete this after finishing the form response
  const handleTempSubmit = async () => {
    const tempParams =
      'sellToSystemName=Sol&commodityDisplayNames=Gold&maxRouteDistance=50&maxPriceAgeHours=72&cargoCapacity=500&availableCredits=0&maxLandingPadSize=LARGE&maxArrivalDistance=1000&includeFleetCarriers=false&includeSurfaceStations=false&includeOdyssey=false';
    setIsLoading(true);
    const queryUrl = `trade/locate-trade/single?${tempParams}`;
    setRequestUrl(queryUrl);
    setCargoCapacity(500);
    if (requestUrl !== '') await responseMutate();

    if (responseData) {
      console.log("submitted! here's the response", responseData);
    }

    setIsLoading(false);
  };

  const handleSubmit = async (data: FormSubmitProps) => {
    setIsLoading(true);

    const queryParams = encodeQueryString(data);
    const queryUrl = `trade/locate-trade/single?${queryParams}`;
    setRequestUrl(queryUrl);
    setCargoCapacity(data.cargoCapacity);
    if (requestUrl !== '') {
      await responseMutate();
    }

    // TODO: we'll use availableCredits with cargoCapacity to present overall profit
    // once the response returns with profit per unit
    // includeOdyssey isn't being filtered atm

    const res = responseError ?? responseData;
    console.log("submitted! here's the response", res);

    setIsLoading(false);
  };

  const checkBreakpointBeforeShowingResponse = () => {
    if (isLarge)
      return (
        <SingleTradeResponseDesktop
          results={responseData}
          cargoCapacity={cargoCapacity}
        />
      );
    return <Text>Mobile Response</Text>;
  };

  return (
    <Flex flexDirection="column" gap="24px" width="100%">
      <HStack spacing={4}>
        <PageHeading heading="Single Trade Route Finder" />
      </HStack>
      <Text>Find a one-way trade with your choice of filters.</Text>
      <Text>
        Be sure to include either a buy system, a sell system, or both. You
        don't have to select a station if you're happy with anywhere within that
        system.
      </Text>
      <Box
        borderWidth="2px"
        borderRadius="9px"
        borderColor={GetColor('border')}
        padding="1rem"
      >
        <Form
          onSubmitHandler={handleSubmit}
          tempSubmitHandler={handleTempSubmit}
          isLoading={isLoading}
          commodities={commodities}
        />
      </Box>
      {/* {responseData?.length > 0 && ( */}
      {/*   <Response cargoCapacity={cargoCapacity} results={responseData} /> */}
      {/* )} */}
      {responseData?.length > 0 && checkBreakpointBeforeShowingResponse()}
    </Flex>
  );
};

export default PageClient;
