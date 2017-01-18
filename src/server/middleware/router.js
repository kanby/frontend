import Inferno from 'inferno';
import Router from 'koa-router';
import { renderToString } from 'inferno-server';
import AppTemplate from '../templates/app';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.status = 200;
});

router.get('*', (ctx, next) => {
  if (ctx.state.infernoRouter && ctx.state.infernoRouter.body) {
    ctx.body = renderToString(
      <AppTemplate locale="en" title="Kanby">{ctx.state.infernoRouter.body}</AppTemplate>,
    );

    ctx.status = 200;
  }

  return next();
});

export default router;
