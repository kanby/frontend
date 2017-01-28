import Inferno from 'inferno';
import Router from 'koa-router';
import { renderToString } from 'inferno-server';
import AppTemplate from '../templates/app';
import getManifest from '../util/get-manifest';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.status = 200;
});

router.get('*', async (ctx, next) => {
  if (ctx.state.infernoRouter && ctx.state.infernoRouter.body) {
    const manifest = await getManifest();

    ctx.body = renderToString(
      <AppTemplate locale="en" title="Kanby" manifest={manifest}>{ctx.state.infernoRouter.body}</AppTemplate>,
    );

    ctx.status = 200;
  }

  return next();
});

export default router;
