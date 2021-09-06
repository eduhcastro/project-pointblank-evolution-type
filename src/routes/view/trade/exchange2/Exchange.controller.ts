import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserEvoRepositories } from "../../../../repositories/UserEvo.repositorie";
import NodeJsonCore from "../../../../core/NodeJson.core"
import path from 'path'

export default async function (req: Request, res: Response) {
  const { token } = req.query

  if (typeof token === 'undefined' || typeof token !== 'string' || token.length < 64) {
    res.json({
      status: false,
      errorcode: 401
    })
    return res.end()
  }


  const SearchTrade = NodeJsonCore.getData({ data: "Sessions" }).Sessions.filter((x: any) => x.sessionkey === token)

  if (typeof SearchTrade === 'undefined' || SearchTrade.length === 0) {
    res.json({
      status: false,
      errorcode: 404
    })
    return res.end()
  }

  const { participant, owner } = SearchTrade[0]
  let userEvo;
  if (owner !== req.session.user.login && participant !== null) {
    res.json({
      status: false,
      errorcode: 405
    })
    return res.end()
  }

  const userEvoRepository = getCustomRepository(UserEvoRepositories)
  userEvo = await userEvoRepository.findOne({
    userlogin: req.session.user.login
  })

  res.status(200)
  res.render(path.join(__dirname, 'Exchange.view.ejs'), {
    
    user: {
      name: typeof req.session.user !== "undefined" ? req.session.user.login : false,
      personalization: [userEvo]
    }
  })
  res.end()
}


