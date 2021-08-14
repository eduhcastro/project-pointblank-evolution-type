import express from 'express'
import * as middleware from '../middlewares'
import * as routers from './routes'
import * as api from './api'

const router = express.Router()

/**
 * Apis
 */
router.post('/app/authenticate', api.AuthUserApi)
router.post('/app/logout', api.LogoutUserApi)
router.post('/app/trade/create', middleware.Logged, api.CreateTradeApi)

/**
 * Rotas comuns
 */
router.get('/', routers.HomeController)
router.get('/app/authenticate', middleware.LoggedBlock, routers.AuthController)
router.get("/app/trade/create", middleware.Logged, routers.CreateTradeController)
router.get("/app/trade/exchange", middleware.Logged, routers.ExchangeTradeController)

export default router