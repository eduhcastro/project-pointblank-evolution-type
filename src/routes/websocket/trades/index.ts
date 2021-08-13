import NodeJsonCore from "../../../core/NodeJson.core";
import { TradeListCore } from "../../../core/TradeList.core";

export default async function (io: any, socket: any) {

  socket.on('RoomJoin', async function (data: any) {
    if (data.room === 'Trades') {
      io.to(socket.id).emit('RoomJoin', {
        status: true
      })
      socket.join('Trades')

      const user = typeof socket.handshake.session.user !== 'undefined' ? socket.handshake.session.user.login : null
      io.to('Trades').to(socket.id).emit('Load', {
        Sessoes: await TradeListCore.handler(NodeJsonCore.getData({ data: "Sessions" }), user)
      })
    }
  })


}