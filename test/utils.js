import cheerio from 'cheerio';
import { renderToStaticMarkup } from 'inferno-server';

export const render = node => cheerio.load(renderToStaticMarkup(node));
export const selector = (...styles) => styles.map(style => `.${style}`).join('');

export default { render };
