import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import AppTemplate from 'server/templates/app';

export default (ctx, next) => {
  if (ctx.state.tree) {
    ctx.body = renderToStaticMarkup(
      <AppTemplate title="Kanby" body={renderToString(ctx.state.tree)} state={ctx.state.store.getState()}/>,
    );

    ctx.status = 200;
  } else {
    return next();
  }
};
