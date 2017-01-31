import Koa from 'koa';
import routes from 'shared/routes';

import config from 'server/config';
import { router, logger, infernoRouter, assets } from './middleware';
import { log } from './util';

log(`Server loading [env: '${config.get('environment')}']`);

const server = new Koa();

server.use(logger);
server.use(assets);
server.use(infernoRouter(routes));
server.use(router.routes());
server.use(router.allowedMethods());

export default server;
