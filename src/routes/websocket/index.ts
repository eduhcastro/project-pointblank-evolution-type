import ChatSocket from './chat';
import TradeListSocket from './trades'
import ExchangeSocket from './trade'
//import RoulleteSocket from './roullete'
import cron from 'node-cron';
import { RoulleteController } from './roullete/controller'
const roulleteController = new RoulleteController();

class SocketIO {
  rewards = [] as Array<object>

  addReward(executeRoullete: any) {
    if(this.rewards.length === 6) {
      this.rewards.pop()
    }
    this.rewards.push({
      number: executeRoullete.number,
      color: executeRoullete.color,
    })
  }

  roullete(io: any) {
    //if (typeof socket.handshake.headers.referer.split("roullete")[1] === 'undefined') return
    let i = '0'
    let counter = 20
    let start = 0
    if (start === 0) {
      start = 1
      cron.schedule('*/1 * * * * *', () => {
        
        if (counter > 0) {
          counter--
          console.log("Time to Start:" + counter)
          io.emit(`Roullete::Time`, {
            timeToStart: counter,
            rewads: this.rewards
          })
        } else {
          let executeRoullete = roulleteController.Execute(0)[0]
          this.addReward(executeRoullete)
          //console.log("Send " + counter)
          //i === '0' ? i = roulleteController.Execute(0) : i = roulleteController.Execute(Math.abs(Number(i)))
          //console.log(i)
          io.emit(`Roullete::Data`, {
            trans: `-${executeRoullete.param}.00px, 0px, 0px`,
            number:   executeRoullete.number,
            color:    executeRoullete.color
          })
          setTimeout(() => {
            io.emit(`Roullete::Data`, {
              trans: `0.00px, 0px, 0px`,
              speed: true
            })
          }, 7500)
          io.emit(`Roullete::Time`, {
            timeToStart: counter,
            rewads: this.rewards,
            start: true
          })
          counter = 20
          //console.log(i);
        }
      })
    }
  }

  commum(io: any) {
    io.sockets.on('connect', (socket: any) => {
      ChatSocket(io, socket)
      TradeListSocket(io, socket)
      ExchangeSocket(io, socket)
      //RoulleteSocket(io, socket)
    })
  }

  /* <Socket.IO> */
  init(io: any) {
    //let i = 10
    //setInterval(() => {
    //  if (i !== 0) {
    //    console.log('ping' + i)
    //    i--
    //  }
    //}, 3000)

    this.commum(io)
    this.roullete(io)
  }
}


export default SocketIO
//export default function(io: any){
//  io.sockets.on('connect', function(socket: any){
//    ChatSocket(io,socket)
//    TradeListSocket(io,socket)
//    ExchangeSocket(io,socket)
//    RoulleteSocket(io,socket)
//    let i = 10
//    setInterval(() => {
//      i > 0 ? i--: 10
//      console.log('ping'+i)
//    }, 3000)
//  })
//}