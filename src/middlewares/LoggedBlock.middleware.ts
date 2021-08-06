import { Request, Response, NextFunction } from 'express'
import * as routesControl from '../core/Routes.core'

export function LoggedBlockMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const [origin,method,session] = [req.originalUrl,req.method,req.session]
  if(typeof session.autorizacao !== 'undefined'){

    if(method === 'POST'){
      return res.status(401).json({
          status: false,
          error: 401
      })
    }
   res.redirect('/')
   return next()
  }
  return next()
}
