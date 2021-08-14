import NodeJsonCore from "../../../core/NodeJson.core";

class ControllerExchangeTrade {

  handler(data: any) {
    // User Verificacao
    if (typeof data.session === 'undefined') {
      return { status: false, error: 'Sessão inválida!' }
    }
    if (typeof data.session.id === 'undefined') {
      return { status: false, error: 'Sessão inválida!' }
    }
    return { status: true }
  }
}

class ControllerExchangeTradeItems {
  Tratament = {

    SecsToDays(seconds: number) {
      seconds = Number(seconds)
      var d = Math.floor(seconds / (3600 * 24))
      var dDisplay = d
      return dDisplay
    }

  }

  Weapons = {

    Items: NodeJsonCore.getData({ data: "Weapons" }).Weapons,


    search: function (id: Number, callback: any) {
      return callback(this.Items.find(function (post: any, index: any) {
        if (post.id === id) {
          return true
        }
      }));
    }
  }

  handler(weaponsUser: any) {
    //const data = await userFindItemsService.handler(user)
    let Weapons = [] as any
    for (let Items of weaponsUser) {
      this.Weapons.search(Items.item_id, (value: any) => {
        if (typeof value !== 'undefined') {
          Weapons.push({
            id: parseInt(Items.object_id),
            itemname: value.name,
            itemcount: this.Tratament.SecsToDays(parseInt(Items.count)),
            itemprice: value.price * 3,
            itemimg: value.img,
            owneritem: true
          })
        }
      })
    }
    return Weapons
  }
}

export { ControllerExchangeTrade, ControllerExchangeTradeItems }
