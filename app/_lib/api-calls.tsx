/* eslint-disable no-console */
// Purpose: API calls to the backend - name ending with Server are used in page.tsx, name ending with Client are used in page.client.tsx
import useSWR, { KeyedMutator } from 'swr';

const now = new Date().toISOString();

// Default fetcher for SWR. Custom fetcher can be passed as needed
const fetcher = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    console.log(now, ' Failed to fetch data at: ', url);
    throw new Error('Failed to fetch data. Try again, or wait until later.');
  }

  return res.json();
};

async function getFormElementDataServer(queryString: string) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STAGING_API_URL}/api/v1/${queryString}`,
    { next: { revalidate: 86400 } },
  );

  if (!req.ok) {
    console.log(now, ' Failed to fetch data at: ', queryString);
    throw new Error('Failed to fetch data. Try again, or wait until later.');
  }
  return req.json();
}
// Reusable client calls are written as hooks with swr
const useGetSubmitFormClient = (queryString: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/v1/${queryString}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

const useGetMockSubmitFormClient = (queryString: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_MOCK_API_URL}/api/v1/${queryString}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

interface SWR {
  error: any | undefined;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
}

type CustomResponse<T> = T & SWR;

// typical request fetching data from staging URL
const useGetData = <T,>(queryString: string) => {
  const { data, error, isLoading, mutate }: CustomResponse<{ data: T }> =
    useSWR(
      `${process.env.NEXT_PUBLIC_STAGING_API_URL}/api/v1/${queryString}`,
      fetcher,
      {
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
      },
    );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export {
  getFormElementDataServer,
  useGetSubmitFormClient,
  useGetMockSubmitFormClient,
  useGetData,
};
