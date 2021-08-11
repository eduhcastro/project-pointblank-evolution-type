import { getCustomRepository } from "typeorm";
import { UserEvoRepositories } from "../repositories/UserEvo.repositorie";

const TradeList = {

  async handler(data: Array<any>, user: string) {

    let Sessoes = []
    for (var Sessao of data) {
      if (Sessao.owner !== user && Sessao.public === "true" && Sessao.participant === null) {

        const UserDetails = await getCustomRepository(UserEvoRepositories).findOne({
          userlogin: Sessao.owner
        })

        Sessoes.push({
          id: 1,
          name: Sessao.name,
          sessionkey: Sessao.sessionkey,
          owner: Sessao.owner,
          personalization: {
            categorys: Sessao.personalization.categorys,
            background: Sessao.personalization.background,
            description: Sessao.personalization.description,
            thumbnail: Sessao.personalization.thumbnail
          },
          userDetails: {
            picture: UserDetails?.picture,
            rank: UserDetails?.level
          }
        })
      }
    }
    return Sessoes
  }
}

export { TradeList as TradeListCore }