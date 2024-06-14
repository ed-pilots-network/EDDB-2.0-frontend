'use client';

import { useState } from 'react';
import {
  Box,
  HStack,
  Flex,
  Text,
  useMediaQuery,
  Fade,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Form from '@/components/trade-routes/single/Form';
import GetColor from '@/app/_hooks/colorSelector';
import PageHeading from '@/app/_components/utility/pageHeading';
import { useGetData } from '@/app/_lib/api-calls';
import {
  FormResponseProps,
  FormSubmitProps,
} from '@/app/_components/trade-routes/single/Schema';
import SingleTradeResponseDesktop from '@/app/_components/trade-routes/single/response/desktop/ResponseDesktop';
import SingleTradeResponseMobile from '@/app/_components/trade-routes/single/response/mobile/ResponseMobile';
import type { ICommodity } from '@/app/_types';

interface IPageClientProps {
  commodities: ICommodity[] | null;
}

const PageClient = ({ commodities }: IPageClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestUrl, setRequestUrl] = useState('');
  const [cargoCapacity, setCargoCapacity] = useState(1);
  const [isLarge] = useMediaQuery('(min-width: 1024px)');

  const {
    data: responseData,
    error: responseError,
    mutate: responseMutate,
  } = useGetData<FormResponseProps[]>(requestUrl);

  // this is messy. can it be made universal and extracted?
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
    setIsLoading(true);
    setIsSubmitted(false);

    const tempParams =
      'sellToSystemName=Sol&commodityDisplayNames=Gold&maxRouteDistance=50&maxPriceAgeHours=72&cargoCapacity=500&availableCredits=0&maxLandingPadSize=LARGE&maxArrivalDistance=1000&includeFleetCarriers=false&includeSurfaceStations=false&includeOdyssey=false';
    const queryUrl = `trade/locate-trade/single?${tempParams}`;
    setRequestUrl(queryUrl);
    setCargoCapacity(500);
    if (requestUrl !== '') await responseMutate();

    if (responseData) {
      console.log("submitted! here's the response", responseData);
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleSubmit = async (data: FormSubmitProps) => {
    setIsLoading(true);
    setIsSubmitted(false);

    // includeOdyssey isn't being filtered atm
    const queryParams = encodeQueryString(data);
    const queryUrl = `trade/locate-trade/single?${queryParams}`;
    setRequestUrl(queryUrl);
    setCargoCapacity(data.cargoCapacity);
    if (requestUrl !== '') {
      await responseMutate();
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
  };

  const checkBreakpointBeforeShowingResponse = () => {
    if (isLarge)
      return (
        <Fade in={responseData.length > 0} style={{ width: '100%' }}>
          <SingleTradeResponseDesktop
            results={responseData}
            cargoCapacity={cargoCapacity}
          />
        </Fade>
      );
    return (
      <Fade in={responseData.length > 0} style={{ width: '100%' }}>
        <SingleTradeResponseMobile
          results={responseData}
          cargoCapacity={cargoCapacity}
        />
      </Fade>
    );
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
      {responseData && responseData.length === 0 && isSubmitted && (
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          No results found!
        </Alert>
      )}
      {responseError && isSubmitted && (
        <Alert status="error">
          <AlertIcon />
          Failed to fetch data!
        </Alert>
      )}
      {responseData?.length > 0 && checkBreakpointBeforeShowingResponse()}
    </Flex>
  );
};

export default PageClient;
