/* @flow */

import React from 'react';
import config from 'server/config';
import encode from 'ent/encode';
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
  body: string,
  locale: string,
  title: string,
  state: Object,
};

const escapeState = (state) => encode(JSON.stringify(state));

const AppTemplate = ({ locale = 'en', title, body, state }: AppTemplateProps) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {stylesheet(config.get('environment'))}
    </head>
    <body>
      <script id="application:state" type="text/plain" dangerouslySetInnerHTML={{ __html: escapeState(state) }}></script>
      <div id="application" dangerouslySetInnerHTML={{ __html: body }} />
      <script type="text/javascript" src={assetPath('client.js')} />
    </body>
  </html>
);

export default AppTemplate;
