// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
import {
  Button, HStack, Heading,
} from './components';

// 3. extend the theme
const theme = extendTheme(
  // color mode config
  {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    components: {
      Button, HStack, Heading,
    },
  },
);

export default theme;
