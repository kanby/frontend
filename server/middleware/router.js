import Router from 'koa-router';
import appTemplate from '../templates/app';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = 'ok';
  ctx.status = 200;
});

router.get(/^\/(.*)\/?$/, (ctx) => {
  ctx.body = appTemplate({
    locale: 'en',
    body: '',
    title: 'hello, world!',
  });
  ctx.status = 200;
});

export default router;
