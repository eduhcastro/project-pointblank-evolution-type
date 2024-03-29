import NodeJsonCore from "../../../core/NodeJson.core";
import RanksCore from "../../../core/Ranks.core";
import { getCustomRepository } from "typeorm";
import { UserEvoRepositories } from "../../../repositories/UserEvo.repositorie";

import Controller from "./controller";
export default function(io: any, socket: any){

  socket.on('RoomJoin', function(data: any) {
    if (data.room === 'Chat') {
        io.to(socket.id).emit('RoomJoin', {
            status: true
        })
        socket.join('Chat')
        io.to('Chat').to(socket.id).emit('Load', {
            Messages: NodeJsonCore.getData({
              data: "Messages"
            })
        })
    }
  })

  socket.on('SendMessage', async function(message: any) {


    const userInfo = socket.handshake.session.user

    if(Controller.handler(message, userInfo)){
      return io.to('Chat').to(socket.id).emit('SendMessage', Controller.handler(message, socket.handshake.session.user))
    }

    const User = await getCustomRepository(UserEvoRepositories).findOne({
     userlogin: userInfo.login
    })
    
    const rankUse = new RanksCore();
    const UserExp = await rankUse.updateUserRank(User, 2)

    const messageOpts = {
        id: Math.floor(Math.random() * (999 - 0 + 1)) + 0,
        level: User?.level,
        picture: User?.picture,
        name: userInfo.login.slice(0, -3)+'***',
        message: message.message,
        details: [{
            name: UserExp.name,
            data: UserExp.data
        }]
      }

      if(typeof message.token !== 'undefined'){
        return io.to('Chat').emit(`Message::${message.token}`, messageOpts)
      }

    NodeJsonCore.setData("Messages", messageOpts)
    io.to('Chat').emit('Message', messageOpts)
  })

}