import cheerio from 'cheerio';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const render = node => cheerio.load(renderToStaticMarkup(node));
export const selector = (...styles) =>
  styles.map(style => `.${style}`).join('');

export const createMockComponent = name => {
  const Component = ({ children }) => <div className={name}>{children}</div>;

  Component.displayName = name;

  return Component;
};

export default { render };
