import express from 'express';
import { ROUTES } from '../util/constants.js';
import { adminMiddleware } from '../middleware/admin.js';
import { appLogger as logger } from '../util/logger.js';
import indexHandler from './indexHandler.js';
import loginHandler from './login/loginHandler.js'
import gptHandler from './gpt/gptHandler.js';
import adminHandler from './admin/adminHandler.js';
const router = express.Router();

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
}

router.route(ROUTES.INDEX)
    .get(indexHandler.GET);

router.route(ROUTES.LOGIN)
    .post(loginHandler.POST);

router.route(ROUTES.GPT)
    .post(gptHandler.POST);

router.route(ROUTES.ADMIN)
    .get(adminMiddleware, adminHandler.GET);
    
router.route(ROUTES.ADMIN + ROUTES.NODE + '/:node_id')
    .delete(adminMiddleware, adminHandler.NODE.DELETE);

router.route(ROUTES.ADMIN + ROUTES.SYSTEM)
    .post(adminMiddleware, adminHandler.SYSTEM.POST)
    .patch(adminMiddleware, adminHandler.SYSTEM.PATCH);

router.route(ROUTES.ADMIN + ROUTES.SYSTEM + '/:system_id')
    .delete(adminMiddleware, adminHandler.SYSTEM.DELETE)

router.use(errorHandler);
export default router;