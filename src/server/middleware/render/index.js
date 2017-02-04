/* @flow */

import React from 'react';
import { renderToString } from 'react-dom/server';
import appTemplate from 'server/templates/app';

export default (ctx: Object, next: Function) => {
  if (ctx.state.tree) {
    const body = renderToString(ctx.state.tree);

    ctx.body = appTemplate({
      body,
      state: ctx.state.store.getState(),
      styles: ctx.state.styletron.getStylesheetsHtml(),
      title: "Kanby",
    });

    ctx.status = 200;
  } else {
    return next();
  }
};
