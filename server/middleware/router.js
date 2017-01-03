import React from 'react';
import { renderToString } from 'react-dom/server';
import Router from 'koa-router';
import App from 'components/app';

import appTemplate from '../templates/app';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = 'ok';
  ctx.status = 200;
});

router.get(/^\/(.*)\/?$/, (ctx) => {
  ctx.body = appTemplate({
    locale: 'en',
    body: renderToString(<App />),
    title: 'Kanby',
  });

  ctx.status = 200;
});

export default router;
