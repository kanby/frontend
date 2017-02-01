/* @flow */

import Inferno from 'inferno';
import config from 'server/config';
import path from 'path';

const assetPath = (asset: string) => {
  return path.join(config.get('assets/directory'), asset);
};

const stylesheet = (env: string) => {
  if (env !== 'development') {
    return (
      <link rel="stylesheet" type="text/css" href={assetPath('style.css')} />
    );
  }

  return null;
};

type AppTemplateProps = {
  children: any,
  locale: string,
  title: string,
};

const AppTemplate = ({ children, locale = 'en', title }: AppTemplateProps) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {stylesheet(config.get('environment'))}
    </head>
    <body>
      <div id="application">
        {children}
      </div>
      <script type="text/javascript" src={assetPath('client.js')} />
    </body>
  </html>
);

export default AppTemplate;
