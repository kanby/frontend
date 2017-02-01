import Koa from 'koa';

import config from 'server/config';
import { router, logger, assets } from './middleware';
import routes from 'shared/routing/routes';
import { log } from './util';

log(`Server loading [env: '${config.get('environment')}']`);

const server = new Koa();

const appRouter = router(routes);

server.use(logger);
server.use(assets);
server.use(appRouter.routes());
server.use(appRouter.allowedMethods());

export default server;
