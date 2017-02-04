import Koa from 'koa';

import config from 'server/config';
import { render, router, logger, assets, providers } from './middleware';
import routes from 'shared/routing/routes';
import { log } from './util';

log(`Server loading [env: '${config.get('environment')}']`);

const server = new Koa();

server.use(logger);
server.use(assets);
server.use(router.routes());
server.use(router.allowedMethods());
server.use(providers);
server.use(render);
server.use(ctx => ctx.status = 404);

export default server;
