import { Metadata } from 'next';
import PageClient from './page.client';
import { ICommodity } from '@/app/_types';

export const metadata: Metadata = {
  title: 'EDPN - Loop Trade Route Finder',
  description: 'Elite Dangerous Pilots Network',
  icons: '/EDPN_logo_dark_background.png',
};

export default async function Page() {
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
    console.error(error);
  }

  return <PageClient commodities={commodities} />;
}
