import { Request, Response, NextFunction } from 'express'
import * as routesControl from '../core/Routes.core'

export function LoggedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const [origin,method,session] = [req.originalUrl,req.method,req.session]

  if(typeof session === 'undefined' || session === null){
    
  }

  console.log(origin)


  //routesControl.search(parsed.metodo, parsed.origin, (value: any) => {
  //  if (typeof value !== 'undefined') {
  //    if (value.protected) {
  //      if (!Sessao.utils.check(req.session)) {
  //        res.clearCookie("connect.sid")
  //        if (value.type === "NORMAL") {
  //          return res.redirect('/app/authenticate')
  //        }
  //        return res.json({
  //          status: false,
  //          error: 401
  //        })
  //      }
  //    }
  //    if (value.authblock) {
  //      if (Sessao.utils.check(req.session)) {
  //        return res.redirect('/')
  //      }
  //    }
  //  }
  //  return next()
  //})
  return next()
}
