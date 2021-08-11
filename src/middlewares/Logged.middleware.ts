import { Request, Response, NextFunction } from 'express'
import * as routesControl from '../core/Routes.core'

export function LoggedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const [origin,method,session] = [req.originalUrl,req.method,req.session]

  if(typeof session.user === 'undefined'){
    if(method === 'GET'){
      return res.redirect('/app/authenticate')
    }
    return res.status(401).send('Unauthorized')
  }
  return next()
}
