import express from 'express'
import * as middleware from '../middlewares'
import * as routers from './routes'
import * as apis from './api'

const router = express.Router()

/**
 * Apis
 */
router.post('/app/authenticate', apis.AuthUserApi)
router.post('/app/logout', apis.LogoutUserApi)

/**
 * Rotas comuns
 */
router.get('/', routers.HomeController)
router.get('/app/authenticate', middleware.LoggedBlock, routers.AuthController)
router.get("/app/trade/create", middleware.Logged, routers.CreateTradeController)

export default router