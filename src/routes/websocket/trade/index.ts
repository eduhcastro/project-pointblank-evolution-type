import { ControllerExchangeTrade, ControllerExchangeTradeItems } from './controller'
import NodeJsonCore from "../../../core/NodeJson.core"
import { getCustomRepository } from "typeorm"
import { UserItemsRepositories } from "../../../repositories/UserItems.repositorie"
import { UserEvoRepositories } from '../../../repositories/UserEvo.repositorie'
const controllerExchangeTrade = new ControllerExchangeTrade()
const controllerExchangeTradeItems = new ControllerExchangeTradeItems()

export default async function (io: any, socket: any) {

  if (socket.handshake.headers.referer.indexOf('?token=') !== -1 && typeof socket.handshake.headers.referer.split("?token=")[1] !== 'undefined') {

    const init = {
      session: socket.handshake.session
    }

    if (!controllerExchangeTrade.handler(init).status) {
      console.log('A')
      return socket.disconnect()
    }

    let User = {
      login: socket.handshake.session.user.login,
      id: socket.handshake.session.user.id,
      sessao: socket.handshake.headers.referer.split("?token=")[1],
      channel: `${socket.handshake.headers.referer.split("?token=")[1]}::Channel`
    }

    let TradeCourrent = NodeJsonCore.getData({ data: "Sessions" }).Sessions.filter((x: any) => x.sessionkey === User.sessao)
    if (TradeCourrent.length === 0) {
      console.log('B')
      return socket.disconnect()
    }


    const Items = await getCustomRepository(UserItemsRepositories).find({
      owner_id: User.id
    })



    if(!socket.rooms.has(`${socket.handshake.headers.referer.split("?token=")[1]}::Channel`)){ 
      await socket.join(`${socket.handshake.headers.referer.split("?token=")[1]}::Channel`)
    }
   
    if (TradeCourrent[0].owner === User.login) {
      io.to(`${socket.handshake.headers.referer.split("?token=")[1]}::Channel`).emit(`${User.sessao}::getItems`, {
        items: controllerExchangeTradeItems.handler(Items),
        owner: User.login
      })

    } else {
      if (TradeCourrent[0].participant !== null) {
        //console.log(`[TRADE][JOIN][ERRO] Já existe um participante`)
        return socket.disconnect()
      }


      //   Treatment.Trade.insertParticipant(User, Trade.find)

      const Details = async (user: string) => { 
        const Detail = await getCustomRepository(UserEvoRepositories).find({userlogin: user})
        return Detail[0]
      }


      io.to(User.channel).emit(`${User.sessao}::getItems`, {
        items: controllerExchangeTradeItems.handler(Items),
        owner: User.login,
        ownerDetails: {
          picture: (await Details(User.login)).picture,
        }
      })

      io.to(User.channel).to(socket.id).emit(`${User.sessao}::getItems`, {
        items: controllerExchangeTradeItems.handler(await getCustomRepository(UserItemsRepositories).find({
          owner_id: TradeCourrent[0].ownerid
        })),
        owner: TradeCourrent[0].owner,
        ownerDetails: {
          picture: (await Details(TradeCourrent[0].owner)).picture,
        }
      })
    }
    socket.on("disconnect", () => {
      if (TradeCourrent.length > 0) {
        //Treatment.Trade.usersOnline(false, Trade.find)

        if (TradeCourrent[0].owner === User.login) {
          io.to(User.channel).emit(`${User.sessao}::Disconnect`, {
            level: 0,
            user: 0
          })
          //console.log(`O Dono da trade Saiu! [${User.sessao}]`)
          //Treatment.Trade.delete(Treatment.GetTrade())
        } else {
          io.to(User.channel).emit(`${User.sessao}::Disconnect`, {
            level: 0,
            user: 1
          })
          //console.log(`O Participante saiu! [${User.sessao}]`)
          //Treatment.Trade.removeParticipant(Trade.find)
        }
      }
    })

  }

}