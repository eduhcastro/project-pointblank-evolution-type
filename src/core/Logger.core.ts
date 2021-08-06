import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import { environment, logDirectory } from '../server.config';

let dir = logDirectory;
if (!dir) dir = path.resolve('logs');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const [d,m,y] = new Date().toLocaleDateString('pt-BR', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).split("/")


export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
    }),
    new transports.File({
      level: logLevel,
      filename: dir + `/${d+m+y}.log`,
      zippedArchive: true,
      handleExceptions: true,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint())
    }),
  ],
  exitOnError: true,
})