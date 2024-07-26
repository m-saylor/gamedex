import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  variants: {
    solidPink: {
      _hover: {
        bg: 'pink.300',
      },
      as: 'a',
      bg: 'pink.400',
      className: 'new-user-homepage-menu-buttons',
      color: 'white',
      cursor: 'pointer',
      display: { base: 'none', md: 'inline-flex' },
      fontSize: 13.5,
      fontWeight: '700',
    },
    ghostBW: {
      _hover: {
        bg: 'gray.400',
      },
      as: 'a',
      className: 'new-user-homepage-menu-buttons',
      cursor: 'pointer',
      fontSize: 13.5,
      fontWeight: '700',
      variant: 'ghost',
    },
    greenAdd: {
      _hover: {
        bg: '#9ae6b4',
      },
      bg: '#68d391',
      cursor: 'pointer',
      display: { base: 'none', md: 'inline-flex' },
      fontSize: 13.5,
      fontWeight: '700',
      variant: 'solid',
    },
    redSolid: {
      _hover: {
        bg: '#bd3333',
      },
      bg: '#e53e3e',
      cursor: 'pointer',
      display: { base: 'none', md: 'inline-flex' },
      fontSize: 13.5,
      fontWeight: '700',
      variant: 'solid',
    },
  },
});

export const HStack = defineStyleConfig({
  variants: {
    navButtonRow: {
      justify: 'flex-end',
      spacing: 3,
      flex: { base: 1, md: 0 },
    },
  },
});

export const Heading = defineStyleConfig({
  variants: {
    rankNumber: {
      color: '#cccccc',
      size: 'lg',
      fontSize: 56,
      fontWeight: 700,
      height: '100%',
    },
  },
});
