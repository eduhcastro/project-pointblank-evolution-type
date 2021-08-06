import { Request, Response } from "express";
import path from 'path'

export default async function(req: Request, res: Response) {
  const error = req.session.error
  typeof error !== 'undefined' ? res.clearCookie("connect.sid"): ''
  res.status(200)
  res.render(path.join(__dirname, 'Auth.view.ejs'), {
     error,
     csrfToken: "123"
  })
  res.end() 
}
