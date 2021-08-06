import { Request, Response } from "express";

export default async function (req: Request, res: Response) {
  req.session.destroy(function(err: any) {
    if(err){
      res.json({Mensagem: "Erro ao"})
      return res.end()
    }
    res.clearCookie("connect.sid")
    res.status(200)
    res.json({Mensagem: "Sessao destruida"})
    res.end()
  })
}
