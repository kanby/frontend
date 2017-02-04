/* @flow */

const colors = {
  black: '#223140',
  green: '#19DD89',
  orange: '#FF6102',
  red: '#FF4040',
  slate: '#556270',
  white: '#FAFAFA',
};

const breakpoints = {
  medium: 768,
  large: 1200,
};

const media = {
  medium: `@media only screen and (min-width: ${breakpoints.medium}px)`,
  large: `@media only screen and (min-width: ${breakpoints.large}px)`,
};

const spacing = {
  small: 8,
  medium: 12,
  large: 16,
  paddingVertical: (size: number = 1) => ({
    paddingTop: `${spacing.small * size}px`,
    paddingBottom: `${spacing.small * size}px`,
    [media.medium]: {
      paddingTop: `${spacing.medium * size}px`,
      paddingBottom: `${spacing.medium * size}px`,
    },
    [media.large]: {
      paddingTop: `${spacing.large * size}px`,
      paddingBottom: `${spacing.large * size}px`,
    },
  })
};

export { breakpoints, colors, spacing, media };
