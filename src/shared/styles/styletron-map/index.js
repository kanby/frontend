import React from 'react';
import mapValues from 'lodash/mapValues';
import { injectStyle } from 'styletron-utils';

export const getStylesProp = (styles, styletron, props) => {
  const handler = exports.stylesHandlers[typeof styles] ||
    exports.stylesHandlers.default;
  return handler(styles, styletron, props);
};

export const stylesHandlers = {
  object: (st, styletron) =>
    mapValues(st, val => (typeof val === 'object' ? injectStyle(styletron, val) : val)),
  function: (st, styletron, props) =>
    exports.getStylesProp(st(props), styletron, props),
  default: st => {
    throw new Error(`you must pass a function or object to mapStyles (got ${typeof st})`);
  },
};

const mapStyles = (Component, styles, key = 'styles') => {
  const StyledElement = (props, { styletron }) => {
    return React.createElement(Component, {
      ...props,
      [key]: exports.getStylesProp(styles, styletron, props),
    });
  };

  if (Component.displayName || Component.name) StyledElement.displayName = `Styled:${Component.displayName || Component.name}`;

  StyledElement.contextTypes = {
    styletron: React.PropTypes.object.isRequired,
  };

  return StyledElement;
};

export default mapStyles;
