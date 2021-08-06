import ChatSocket from './chat';
export default function(io: any){
  io.sockets.on('connect', function(socket: any){
    console.log("OK")
    ChatSocket(io,socket)
  })
}