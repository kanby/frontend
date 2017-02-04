import Router from 'koa-router';
import * as handlers from './handlers';

const router = new Router();

router.get('/health', handlers.healthCheck);
router.get('*', handlers.matchApplicationRoutes);

export default router;
