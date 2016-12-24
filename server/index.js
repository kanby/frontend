import Koa from 'koa';
import * as util from './util';

import { router, logger } from './middleware';

const app = new Koa();

app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  util.log('Listening on port 3000');
});
