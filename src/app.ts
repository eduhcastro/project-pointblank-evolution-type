/*
 * Modulos externos
 */
import "reflect-metadata"
import express, { Request, Response, NextFunction } from 'express'
import expressSession from 'express-session'
import expressSharedSession from 'express-socket.io-session'
import webSocketServices from './routes/websocket'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import "./database";

/*
 * Variaveis locais
 */
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const ioSession = expressSession({
  secret: 'castroms2021pointblank',
  resave: false,
  saveUninitialized: false
})

/*
 * Configuracoes
 */
app.use(ioSession)
io.use(expressSharedSession(ioSession))
app.use(cors())
app.use(express.static('src/web/static'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(routes)

webSocketServices(io)

export default httpServer