import ChatSocket from './chat';
import TradeList from './trades'

export default function(io: any){
  io.sockets.on('connect', function(socket: any){
    ChatSocket(io,socket)
    TradeList(io,socket)
  })
}