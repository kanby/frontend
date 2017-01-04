import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const baseTemplate = `
  <!DOCTYPE html>
  {{content}}
`;

const Template = ({ body, locale, title }) => (
  <html lang={locale || 'en'}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </head>
    <body>
      <div id="application" dangerouslySetInnerHTML={{ __html: body }} />
      <script type="text/javascript" src="/assets/client.js" />
    </body>
  </html>
);

Template.propTypes = {
  body: React.PropTypes.string,
  locale: React.PropTypes.string,
  title: React.PropTypes.string,
};

export default props => baseTemplate.replace('{{content}}', renderToStaticMarkup(<Template {...props} />));
