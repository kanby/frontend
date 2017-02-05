/* @flow */

import spacingHelpers from './spacing-helpers';

export const grid = {
  maxWidth: 1400,
  cols: 12,
};

export const colors = {
  black: '#223140',
  green: '#19DD89',
  orange: '#FF6102',
  red: '#FF4040',
  slate: '#556270',
  white: '#FAFAFA',
};

export const breakpoints = {
  medium: 768,
  large: 1200,
};

export const mediaQueries = {
  medium: `@media only screen and (min-width: ${breakpoints.medium}px)`,
  large: `@media only screen and (min-width: ${breakpoints.large}px)`,
};

const spacingValues = {
  small: 8,
  medium: 12,
  large: 16,
};

export const spacing = {
  ...spacingValues,
  ...spacingHelpers({ spacing: spacingValues, mediaQueries }),
};
