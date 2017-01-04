import Koa from 'koa';

import { router, logger } from './middleware';

const server = new Koa();

server.use(logger);
server.use(router.routes());
server.use(router.allowedMethods());
server.use(logger);

export default server;
