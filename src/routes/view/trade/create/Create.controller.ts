import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserEvoRepositories } from "../../../../repositories/UserEvo.repositorie";
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
  res.render(path.join(__dirname, 'Create.view.ejs'), {
    user: {
      name: typeof req.session.user !== "undefined" ? req.session.user.login : false,
      personalization: typeof req.session.user !== "undefined" ? [userEvo] : false
    }
  })
  res.end()
}