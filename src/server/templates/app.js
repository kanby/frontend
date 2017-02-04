/* @flow */

import React from 'react';
import config from 'server/config';
import encode from 'ent/encode';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import globalStyles from 'shared/styles/global';

const assetPath = (asset: string) => {
  return path.join(config.get('assets/directory'), asset);
};

type AppTemplateProps = {
  body: string,
  locale?: string,
  title: string,
  state: Object,
  styles: string,
};

const escapeState = state => encode(JSON.stringify(state));

const AppTemplate = (
  { locale = 'en', title, body, state }: AppTemplateProps,
) => (
  <html lang={locale}>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: globalStyles }}
      />
      <script id="__STYLES__" />
    </head>
    <body>
      <script
        id="application:state"
        type="text/plain"
        dangerouslySetInnerHTML={{ __html: escapeState(state) }}
      />
      <div id="application" dangerouslySetInnerHTML={{ __html: body }} />
      <script type="text/javascript" src={assetPath('client.js')} />
    </body>
  </html>
);

export default (props: AppTemplateProps) =>
  renderToStaticMarkup(<AppTemplate {...props} />).replace(
    '<script id="__STYLES__"></script>',
    props.styles,
  );
