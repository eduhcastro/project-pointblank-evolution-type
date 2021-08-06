import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserEvoRepositories } from "../../../repositories/UserEvo.repositorie";
import path from 'path'

export default async function (req: Request, res: Response) {
  let userEvo;

  if (typeof req.session.user !== 'undefined') {
    const userEvoRepository = getCustomRepository(UserEvoRepositories)
    userEvo = await userEvoRepository.findOne({
      userlogin: req.session.user.login
    })
  }

  res.status(200)
  res.render(path.join(__dirname, 'Home.view.ejs'), {
    user: {
      name: typeof req.session.user !== "undefined" ? req.session.user.login : false,
      personalization: [userEvo]
    },
    currentTrade: null,
    findTrade: req.query.search,
    Tools: null
  })
  res.end()
}
