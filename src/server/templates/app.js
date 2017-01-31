/* @flow */

import Inferno from 'inferno';
import config from 'server/config';

const stylesheet = (env: string, manifest: Object) => {
  if (env !== 'development') {
    return (
      <link rel="stylesheet" type="text/css" href={manifest['client.css']} />
    );
  }

  return null;
};

type AppTemplateProps = {
  children: any,
  locale: string,
  title: string,
  manifest: Object,
};

const AppTemplate = (
  { children, locale = 'en', title, manifest }: AppTemplateProps,
) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {stylesheet(config.get('environment'), manifest)}
    </head>
    <body>
      <div id="application">
        {children}
      </div>
      <script type="text/javascript" src={manifest['client.js']} />
    </body>
  </html>
);

export default AppTemplate;
