import cron from 'node-cron';
import { RoulleteController } from './controller'
const roulleteController = new RoulleteController();
export default async function (io: any, socket: any) {
  if(typeof socket.handshake.headers.referer.split("roullete")[1] === 'undefined') return
  let i = '0'
  let counter = 20
  let start = 0
  if(start === 0){
    start = 1
  cron.schedule('*/1 * * * * *', () => {
   
      if (counter > 0) {
        counter--
        console.log("Time to Start:" + counter)
        io.emit(`Roullete::Time`, {
          timeToStart: counter
        })
      } else {
        console.log("Send" + counter)
        i === '0' ? i = roulleteController.Execute(0) : i = roulleteController.Execute(Number(i)).split("-")[1]
        io.emit(`Roullete::Data`, {
          trans: `${i}.00px, 0px, 0px`
        })
        io.emit(`Roullete::Time`, {
          timeToStart: counter
        })
        counter = 20
      //console.log(i);
    }
  })
}

}
