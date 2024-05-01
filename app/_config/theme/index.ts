import { extendTheme } from '@chakra-ui/react';
import buttonTheme from './button';
import checkboxTheme from './checkbox';
import radioTheme from './radio';
import selectTheme from './select';
import tabsTheme from './tabs';

const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    Radio: radioTheme,
    Select: selectTheme,
    Tabs: tabsTheme,
    SimpleGrid: {
      baseStyle: {
        backgroundColor: 'blue.6',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    light: {
      text: '#272f33',
      textSelected: '#f6ad55',
      textLight: '#e6eef2',
      background: '#e6eef2',
      box: '#4e5d66',
      border: '#9bb9cb',
      borderAccent: '#9bb9cb',
      accentBackground: '#cddce5',
      gridAccent: '#cddce5',
    },
    dark: {
      text: '#F2F2F2',
      textSelected: '#f6ad55',
      background: '#2B2D31',
      box: '#1E1F22',
      border: '#cddce5',
      borderAccent: '#9bb9cb',
      accentBackground: '#272f33',
      gridAccent: '#313b40',
    },
    orange: {
      1: '#FEEBC8',
      2: '#FBD38D',
      3: '#f6ad55',
      4: '#ED8936',
      5: '#DD6B20',
      6: '#C05621',
    },
    blue: {
      1: '#f3f7f9',
      2: '#e6eef2',
      3: '#cddce5',
      4: '#9BB9CB',
      5: '#4e5d66',
      6: '#272f33',
      7: '#313b40',
      8: '#2c353a',
      9: '#dae5ec',
    },
    brown: {
      1: '#f6f2ed',
      2: '#ede5db',
      3: '#dacab6',
      4: '#b4956d',
      5: '#5a4b37',
      6: '#2d261c',
    },
    switchLight: {
      500: '#ed8936',
    },
    switchDark: {
      200: '#9bb9cb',
    },
  },
});

export default theme;
