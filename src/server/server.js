import Koa from 'koa';
import routes from 'shared/routes';

import { router, logger, infernoRouter, assets } from './middleware';

const server = new Koa();

server.use(logger);
server.use(assets);
server.use(infernoRouter(routes));
server.use(router.routes());
server.use(router.allowedMethods());

export default server;
