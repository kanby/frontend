import cheerio from 'cheerio';
import Inferno from 'inferno';
import { renderToStaticMarkup } from 'inferno-server';

export const render = node => cheerio.load(renderToStaticMarkup(node));
export const selector = (...styles) => styles.map(style => `.${style}`).join('');

export const createMockComponent = (name) => {
  const Component = ({ children }) => (
    <div className={name}>{children}</div>
  );

  Component.displayName = name;

  return Component;
};

export default { render };
