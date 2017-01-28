/* @flow */

import koaStatic from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import config from '../config';

const assetMountPoint = path.join('/', config.get('assets/directory'));
const staticMiddleware = koaStatic(config.get('assets/path'), { defer: false });
const assetMiddleware = mount(assetMountPoint, staticMiddleware);

export default assetMiddleware;
