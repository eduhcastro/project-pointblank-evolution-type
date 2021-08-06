import NodeJsonCore from "../../../core/NodeJson.core";
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

    const messageOpts = {
        id: NodeJsonCore.getData({data: "Messages"}).length+1,
        level: User?.level,
        picture: User?.picture,
        name: userInfo.login.slice(0, -3)+'***',
        message: message.message,
      }
    

    NodeJsonCore.setData("Messages", messageOpts)
    io.to('Chat').emit('Message', messageOpts)
  })

}