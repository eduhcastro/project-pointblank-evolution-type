import app from './app'
import Logger from './core/Logger.core'
import { port } from './server.config'

app.listen(port, () => { 
  Logger.info(`On ${port}`)
}).on('error', (e) => Logger.error(e))
