import { Metadata } from 'next';
import PageClient from './page.client';
import { ICommodity } from '../_types';

export const metadata: Metadata = {
  title: 'EDPN - Stations',
  description: 'Elite Dangerous Pilots Network',
  icons: 'EDPN_logo_dark_background.png',
};

export default async function getCommodities() {
  let commodities: ICommodity[] | null = null;

  try {
    const commoditiesReq = await fetch(
      `${process.env.NEXT_PUBLIC_STAGING_API_URL}/api/v1/trade/commodity`,
      { next: { revalidate: 86400 } },
    );

    if (!commoditiesReq.ok) {
      throw new Error(`HTTP error! status: ${commoditiesReq.status}`);
    }

    commodities = (await commoditiesReq.json()) as ICommodity[];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error(error);
    throw error;
  }

  return <PageClient commodities={commodities} />;
}
