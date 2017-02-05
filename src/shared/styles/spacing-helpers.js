/* @flow */

import merge from 'lodash/merge';
import { Spacing, MediaQueries } from './_types';

// create helper functions for margin, padding based on spacing that scales from media queries.

const declarations = ['margin', 'padding'];

const createDeclarationHelper = (spacing: Spacing, mq: MediaQueries) =>
  decl => {
    const declHelper = {
      [`${decl}Top`]: (size: number = 1) => ({
        [`${decl}Top`]: `${spacing.small * size}px`,
        [mq.medium]: {
          [`${decl}Top`]: `${spacing.medium * size}px`,
        },
        [mq.large]: {
          [`${decl}Top`]: `${spacing.large * size}px`,
        },
      }),
      [`${decl}Right`]: (size: number = 1) => ({
        [`${decl}Right`]: `${spacing.small * size}px`,
        [mq.medium]: {
          [`${decl}Right`]: `${spacing.medium * size}px`,
        },
        [mq.large]: {
          [`${decl}Right`]: `${spacing.large * size}px`,
        },
      }),
      [`${decl}Bottom`]: (size: number = 1) => ({
        [`${decl}Bottom`]: `${spacing.small * size}px`,
        [mq.medium]: {
          [`${decl}Bottom`]: `${spacing.medium * size}px`,
        },
        [mq.large]: {
          [`${decl}Bottom`]: `${spacing.large * size}px`,
        },
      }),
      [`${decl}Left`]: (size: number = 1) => ({
        [`${decl}Left`]: `${spacing.small * size}px`,
        [mq.medium]: {
          [`${decl}Left`]: `${spacing.medium * size}px`,
        },
        [mq.large]: {
          [`${decl}Left`]: `${spacing.large * size}px`,
        },
      }),
      [`${decl}Vertical`]: (size: number = 1) =>
        merge(
          declHelper[`${decl}Top`](size),
          declHelper[`${decl}Bottom`](size),
        ),
      [`${decl}Horizontal`]: (size: number = 1) =>
        merge(
          declHelper[`${decl}Left`](size),
          declHelper[`${decl}Right`](size),
        ),
      [`${decl}`]: (size: number = 1) =>
        merge(
          declHelper[`${decl}Vertical`](size),
          declHelper[`${decl}Horizontal`](size),
        ),
    };

    return declHelper;
  };

export default (
  {
    spacing,
    mediaQueries,
  }: {
    spacing: Spacing,
    mediaQueries: MediaQueries,
  },
  decls: Array<string> = declarations,
) => {
  return decls
    .map(createDeclarationHelper(spacing, mediaQueries))
    .reduce((a, b) => ({ ...a, ...b }), {});
};
