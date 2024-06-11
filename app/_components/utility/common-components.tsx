import type { IStation, ZodStationDtoApiType } from '@/app/_types';
import { Image } from '@chakra-ui/react';

const legendItems = [
  {
    text: 'Surface',
    src: '/assets/Surface_settlement_sprite.png',
    alt: 'Surface Port',
    backgroundPosition: '0px 0px',
  },
  {
    text: 'Carrier',
    src: '/assets/Carrier_sprite.png',
    alt: 'Fleet Carrier',
  },
  {
    text: 'Orbital',
    src: '/assets/Coriolis_sprite.png',
    alt: 'Orbital Station',
  },
];

const legendItemsDark = [
  {
    text: 'Surface',
    src: '/assets/Surface_settlement_dark_sprite.png',
    alt: 'Surface Port',
    backgroundPosition: '0px 0px',
  },
  {
    text: 'Carrier',
    src: '/assets/Carrier_dark_sprite.png',
    alt: 'Fleet Carrier',
  },
  {
    text: 'Orbital',
    src: '/assets/Coriolis_dark_sprite.png',
    alt: 'Orbital Station',
  },
];

const RenderStationTypeIcon = ({
  station,
  isDark,
}: {
  station: ZodStationDtoApiType | IStation;
  isDark: boolean;
}) => {
  if (station.fleetCarrier) {
    if (isDark) {
      return (
        <Image
          src="/assets/Carrier_sprite.png"
          alt="Fleet Carrier"
          boxSize="20px"
          marginY="auto"
        />
      );
    }
    return (
      <Image
        src="/assets/Carrier_dark_sprite.png"
        alt="Fleet Carrier"
        boxSize="20px"
        marginY="auto"
      />
    );
  }
  if (station.planetary) {
    if (isDark) {
      return (
        <Image
          src="/assets/Surface_settlement_sprite.png"
          alt="Planetary Station"
          boxSize="20px"
          marginY="auto"
        />
      );
    }
    return (
      <Image
        src="/assets/Surface_settlement_dark_sprite.png"
        alt="Planetary Station"
        boxSize="20px"
        marginY="auto"
      />
    );
  }
  if (isDark) {
    return (
      <Image
        src="/assets/Coriolis_sprite.png"
        alt="Orbital Station"
        boxSize="20px"
        marginY="auto"
      />
    );
  }
  return (
    <Image
      src="/assets/Coriolis_dark_sprite.png"
      alt="Orbital Station"
      boxSize="20px"
      marginY="auto"
    />
  );
};

export { legendItems, legendItemsDark, RenderStationTypeIcon };
