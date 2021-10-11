class AppTrade{
  Web = "http://localhost:8080"
  Room = "Trades"

  Routes = {
      RoomJoin: `RoomJoin`,
      Load: `Load::Trades`,
      Watching: `Watching`,
  }

  Front = {

    Categories: ["/images/weapons/category/Rifle.png","/images/weapons/category/Shot.png","/images/weapons/category/Sniper.png", "/images/weapons/category/Sub.png"],

    Backgrounds: ["linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)", "linear-gradient(to right, red , yellow)", "linear-gradient(to bottom, #000099 0%, #ff99cc 100%)", "linear-gradient(to bottom, #00cc66 0%, #ff99cc 100%)", "linear-gradient(to bottom, #9900cc 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ffcc00 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ffffff 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ff00ff 0%, #6699ff 100%)", "linear-gradient(to bottom, #99ff66 0%, #6699ff 100%)"],

    Icons: ["/images/icons/diamond.png","/images/icons/sla.png","/images/icons/star-blue.png","/images/icons/star-red.png","/images/icons/weapon.png"]

  }

  insertTrades(data, self){

    const Categorys = (categorys, self) => {
      let Save = []
      for(var Category of categorys){
        Save += `<img src="${self.Front.Categories[parseInt(Category)]}">`
      }
      return Save
    }

    for(var Sessao of data.Sessoes){
      $("div.sc-ffgBur.OeZLy").append(`<div class="sc-eLSyJA lJvlA" style=" flex: 0 0 25%;">
       <a href="/app/trade/exchange?token=${Sessao.sessionkey}">
       </a>
       <div class="item">
          <a href="/app/trade/exchange?token=${Sessao.sessionkey}">
             <div class="modal-items-evolution add" style="background: ${self.Front.Backgrounds[parseInt(Sessao.personalization.background) - 1]};">
                <div class="title">
                   <h3 style="color: rgb(0 2 0);">${Sessao.name}</h3>
                </div>
                <div class="modal-items-item" style="background: rgb(239 239 239 / 0%);">
                   <div class="owner">
                      <img src="${Sessao.userDetails.picture}" alt="mdo" width="32" height="32" class="rounded-circle avatar" data-toggle="tooltip" data-bs-placement="bottom" data-html="true" title="" data-bs-original-title="<b style='color: #ffc659'>${Sessao.owner}</b><br><span>'${Sessao.personalization.description}'</span>">
                   </div>
                   <img src="${self.Front.Icons[parseInt(Sessao.personalization.thumbnail) - 1]}" class="item" style="filter: opacity(1);">
                   <div class="category-imgs item list">
                    ${Categorys(Sessao.personalization.categorys, self)} 
                   </div>
                </div>
             </div>
          </a>
       </div>
      </div>`)
    }
  }

  init(App){
    var Self = this
  
    App.on('connect', function(self = Self){
      
      /**
       * Escolhendo minha sala
       */
      App.emit(self.Routes.RoomJoin, {
        room: self.Room
      })

      /**
       * Recebendo informações da sala
       */
      App.on(self.Routes.RoomJoin, (data) => {
        if (!data.status) {
            console.log('O Servidor recusou sua entrada no tunel.')
            return App.disconnect()
        }
       App.off(self.Routes.RoomJoin)
       console.log('Em tunel com as Trades')
      })

      /**
       * Inserindo as Sessoes no cliente
       */
      App.on(self.Routes.Load, (data) => {
        App.off(self.Routes.Load)
        self.insertTrades(data, self)
      })

      /**
       * Inserindo as Sessoes no cliente
       */
       App.on(self.Routes.Watching, (data) => {
         console.log(data)
        self.insertTrades(data, self)
      })

    })
  }

}

$(document).ready(function() {
  new AppTrade().init(AppIo)
})
