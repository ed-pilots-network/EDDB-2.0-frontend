import {
  faArrowRight,
  faArrowRightArrowLeft,
  faShuttleSpace,
  faArrowTrendUp,
  faMapLocationDot,
  faLandmark,
  faSun,
  faCity,
  faEarthAmericas,
  faCamera,
  faCube,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export interface Module {
  title: string;
  tag: string;
  url: string;
  icon: IconDefinition;
  description: string;
}

export const Tags = ['Discover', 'Trade', 'Outfit'];

const ModuleProps: Module[] = [
  {
    url: '/systems',
    tag: 'Discover',
    icon: faSun,
    title: 'Systems',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/bodies',
    tag: 'Discover',
    icon: faEarthAmericas,
    title: 'Bodies',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/stations',
    tag: 'Discover',
    icon: faCity,
    title: 'Stations',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/attractions',
    tag: 'Discover',
    icon: faCamera,
    title: 'Attractions',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/pois',
    tag: 'Discover',
    icon: faMapLocationDot,
    title: 'POIs',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/factions',
    tag: 'Discover',
    icon: faLandmark,
    title: 'Factions',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/shipyard',
    tag: 'Outfit',
    icon: faShuttleSpace,
    title: 'Shipyard',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/commodities',
    tag: 'Trade',
    icon: faCube,
    title: 'Trade Commodities',
    description: 'Find a place to buy or sell a specific commodity',
  },
  {
    url: '/trade/single',
    tag: 'Trade',
    icon: faArrowRight,
    title: 'Single Trade Route',
    description:
      'Trade from A to B and find the best profit route using multiple filter options',
  },
  {
    url: '/trade/multi',
    tag: 'Trade',
    icon: faArrowTrendUp,
    title: 'Multi-Hop Trade Route',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
  {
    url: '/trade/loop',
    tag: 'Trade',
    icon: faArrowRightArrowLeft,
    title: 'Loop Trade Route',
    description:
      'Browse the universe! Jump to any system or search by many properties',
  },
];

export default ModuleProps;
