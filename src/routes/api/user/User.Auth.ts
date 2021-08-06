import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../../repositories/User.repositorie";



export default async function (req: Request, res: Response) {
  try{
  const usersRepository = getCustomRepository(UserRepositories)

  const { csrf, user, password } = req.body

  if (typeof csrf === "undefined" ||
    typeof user === "undefined" ||
    typeof password === "undefined") {
    res.status(400)
    res.json({
      status: false,
      errorcode: 101
    })
    return res.end()
  }

  const userFind = await usersRepository.findOne({
    login: user,
  })
  
  if(typeof userFind === "undefined"){
    req.session.error = "username or password is invalid"
    res.redirect('/app/authenticate')
    return res.end()
  }

  req.session.user = {
    id: userFind?.player_id,
    login: userFind?.login,
  }
  res.redirect('/');
  return res.end()

  }catch(e){
    req.session.error = "username or password is invalid"
    res.redirect('/app/authenticate')
    return res.end()
  }

}
