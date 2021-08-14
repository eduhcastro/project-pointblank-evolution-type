import ChatSocket from './chat';
import TradeListSocket from './trades'
import ExchangeSocket from './trade'

export default function(io: any){
  io.sockets.on('connect', function(socket: any){
    ChatSocket(io,socket)
    TradeListSocket(io,socket)
    ExchangeSocket(io,socket)
  })
}