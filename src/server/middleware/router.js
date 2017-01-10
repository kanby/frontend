import Router from 'koa-router';

import appTemplate from '../templates/app';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.status = 200;
});

router.get('*', (ctx, next) => {
  if (ctx.state.infernoRouter && ctx.state.infernoRouter.body) {
    ctx.body = appTemplate({
      locale: 'en',
      body: ctx.state.infernoRouter.body,
      title: 'Kanby',
    });

    ctx.status = 200;
  }

  return next();
});

export default router;
