import Router from 'koa-router';

const router = new Router();

router.get('/health', (ctx) => {
  ctx.body = 'ok';
  ctx.status = 200;
});

router.get(/^\/(.*)\/?$/, (ctx) => {
  ctx.body = 'hello, world!';
  ctx.status = 200;
});

export default router;
