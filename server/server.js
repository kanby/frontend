import Koa from 'koa';
import routes from 'shared/routes';

import { router, logger } from './middleware';
import infernoRouter from './middleware/inferno-router-koa';

const server = new Koa();

server.use(logger);
server.use(infernoRouter(routes));
server.use(router.routes());
server.use(router.allowedMethods());

export default server;
