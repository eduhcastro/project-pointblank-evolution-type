import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

interface IData {
  data: string
}


class NodeJson {

  private preData = [
    { name: "TradeCourrent", file: "trade/Courrent.trade" },
    { name: "Sessions", file: "trade/Sessions.trade" },
    { name: "Messages", file: "Chat.data", }]

  private acessData({
    data
  }: IData): any {
    const preLoad = this.preData.find(item => item.name === data)
    if (!preLoad) {
      throw new Error(`${data} not found`)
    }
    const db = new JsonDB(new Config(`./src/database/json/${preLoad.file}.json`, true, false, '/'))
    return {
      db,
      data: db.getObject<any>(preLoad.name)
    }
  }

  public getData({
    data
  }: IData): any {
    return this.acessData({
      data
    }).data
  }

  public setData(data: string, params: object) {
    if (data === 'Messages' && this.getData({ data: 'Messages' }).Messages.length > 30) {
      this.acessData({
        data
      }).db.delete(`/${data}[0]`);
    }
    this.acessData({
      data
    }).db.push(`/${data}[]`, params, true)
  }

}


export default new NodeJson()
