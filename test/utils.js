import cheerio from 'cheerio';
import { renderToStaticMarkup } from 'inferno-server';

export const render = node => cheerio.load(renderToStaticMarkup(node));

export default { render };
