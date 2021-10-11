class AppRoullete {

  Routes = {
    Roullete: `Roullete::Data`,
    RoulleteTime: `Roullete::Time`,
  }

  filters = {

    isNumber: function (value) {
      return !isNaN(value);
    },

    minLength: function (value, min) {
      return value.length >= min;
    },

    logged: function (value) {
      console.log(value)
      return value.length < 2
    },

    convertNumberToMoney : function (value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
  }

  responsive = {

    alertRotation: function(param){

      if(param.start){
        return $(".pro_txt").text("Girando...")
      }
      if(Number(param.timeToStart) >= 14 ){
        return $(".pro_txt").text("Girando...")
      }
      if(Number(param.timeToStart) === 13 ){
        $(".mobile_scroll").empty()
      }
      
     $(".pro_txt").text("GIRANDO EM "+param.timeToStart)
    },

    addUser: function (element,target,value,self) {
      if(element === 0){
        if($(target).children().length > 0){
          return  $(target).append(` <div class="pl_entry">
          <div class="entry_plyr"><a class="" href="/user/NicoD 1"><span
                   class="image_section"><img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/02/02835933489b56ac2b998a41b4317bcb9777299d.jpg"
                      alt="NicoD 1"></span><span class="top_name"><span
                      class="bet_levels roulette">
                      <div class="bet_level_40"><span
                            class="bet_level_val">42</span></div>
                   </span>NicoD 1</span></a></div>
          <div class="entry_amt"><span class="entry_amt_txt"><span
                   class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
       </div>`)
        }
        $(target).append(`<div class="top_entry f0">
        <div class="entry_plyr"><a class="" href="/user/Clash 45">
              <div class="image_block"><img
                    src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c5/c57ff598fc7d90718d38d4ba5c16bebf17e72770_medium.jpg"
                    alt="Clash 45"></div>
              <div class="top_block"><span class="top_txt txt_red">Top
                    Red</span><span class="top_name"><span
                       class="bet_levels roulette">
                       <div class="bet_level_40"><span
                             class="bet_level_val">6</span></div>
                    </span>Clash 45</span></div>
           </a></div>
        <div class="entry_amt"><span class="entry_amt_txt"><span
                 class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
     </div>`)
      }
      if(element === 1){
        if($(target).children().length > 0){
          return  $(target).append(` <div class="pl_entry">
          <div class="entry_plyr"><a class="" href="/user/NicoD 1"><span
                   class="image_section"><img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/02/02835933489b56ac2b998a41b4317bcb9777299d.jpg"
                      alt="NicoD 1"></span><span class="top_name"><span
                      class="bet_levels roulette">
                      <div class="bet_level_40"><span
                            class="bet_level_val">42</span></div>
                   </span>NicoD 1</span></a></div>
          <div class="entry_amt"><span class="entry_amt_txt"><span
                   class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
       </div>`)
        }
        $(target).append(`<div class="top_entry f0">
        <div class="entry_plyr"><a class="" href="/user/Clash 45">
              <div class="image_block"><img
                    src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c5/c57ff598fc7d90718d38d4ba5c16bebf17e72770_medium.jpg"
                    alt="Clash 45"></div>
              <div class="top_block"><span class="top_txt txt_green">Top
                    Green</span><span class="top_name"><span
                       class="bet_levels roulette">
                       <div class="bet_level_40"><span
                             class="bet_level_val">6</span></div>
                    </span>Clash 45</span></div>
           </a></div>
        <div class="entry_amt"><span class="entry_amt_txt"><span
                 class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
     </div>`)
      }
      if(element === 2){
        if($(target).children().length > 0){
          return  $(target).append(` <div class="pl_entry">
          <div class="entry_plyr"><a class="" href="/user/NicoD 1"><span
                   class="image_section"><img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/02/02835933489b56ac2b998a41b4317bcb9777299d.jpg"
                      alt="NicoD 1"></span><span class="top_name"><span
                      class="bet_levels roulette">
                      <div class="bet_level_40"><span
                            class="bet_level_val">42</span></div>
                   </span>NicoD 1</span></a></div>
          <div class="entry_amt"><span class="entry_amt_txt"><span
                   class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
       </div>`)
        }
        $(target).append(`<div class="top_entry f0">
        <div class="entry_plyr"><a class="" href="/user/Clash 45">
              <div class="image_block"><img
                    src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c5/c57ff598fc7d90718d38d4ba5c16bebf17e72770_medium.jpg"
                    alt="Clash 45"></div>
              <div class="top_block"><span class="top_txt txt_green">Top
                    Black</span><span class="top_name"><span
                       class="bet_levels roulette">
                       <div class="bet_level_40"><span
                             class="bet_level_val">6</span></div>
                    </span>Clash 45</span></div>
           </a></div>
        <div class="entry_amt"><span class="entry_amt_txt"><span
                 class="currency-amount">${self.filters.convertNumberToMoney(value)} Cash</span></span></div>
     </div>`)
      }
    },

    rotate: function(param){
      $("div.numbers").css("transition-duration", "5.79723s");
      $("div.numbers").css("transform", "translate3d("+param.trans+")")
      if(param.speed){
      $("div.numbers").css("transition-duration", "1.0s");
      }
    },

    addNumberWin: function(details){
      if(details.color){
      setTimeout(function(){
        $('.latest_games_links.f0').children().last().remove()
        $(".latest_games_links.f0").prepend('<a class="link num_round num_round--winter '+details.color+'" href="/roulette/game/5734542" target="_blank" rel="noopener noreferrer"><span>'+details.number+'</span></a>')
      },6000)
      }
    },

    addNumbersWin: function(details){
      if($(".latest_games_links.f0 > a").length === 0){
        for(let rewards of details.rewads){
          $(".latest_games_links.f0").prepend('<a class="link num_round num_round--winter '+rewards.color+'" href="/roulette/game/5734542" target="_blank" rel="noopener noreferrer"><span>'+rewards.number+'</span></a>')
        }
      }
    }


    //$("p").css("background-color", "yellow");


  }

  actions = (self, App) => {

    //###################################################
    $(document).on('click', 'span.inp-clear-btn', () => {
      $("div.inp-inner > input.inp").val("");
    })

    //###################################################
    $(".bet_btn").click(function () {
      console.log($(this).html())
    })

    //###################################################
    $(document).on('click', '.entry_btn.red', () => {
      if (!self.filters.isNumber($("div.inp-inner > input.inp").val())) return alert("Valor invalido")
      if (!self.filters.minLength($("div.inp-inner > input.inp").val(), 1)) return alert("Valor invalido")
      //if (self.filters.logged(UserLogged)) return alert("Voce precisa esta logado!")
      // FAZER O EMIT PARA SABER SE O USUARIO ESTA LOGADO
      //
      self.responsive.addUser(0,"div.col_one_third.red > div.player_entry > div.entries-ctn > div > div.mobile_scroll",$("div.inp-inner > input.inp").val(),self)
    })

   //###################################################
   $(document).on('click', '.entry_btn.green', () => {
     if (!self.filters.isNumber($("div.inp-inner > input.inp").val())) return alert("Valor invalido")
     if (!self.filters.minLength($("div.inp-inner > input.inp").val(), 1)) return alert("Valor invalido")
     //if (self.filters.logged(UserLogged)) return alert("Voce precisa esta logado!")
     // FAZER O EMIT PARA SABER SE O USUARIO ESTA LOGADO
     //
     self.responsive.addUser(1,"div.col_one_third.green > div.player_entry > div.entries-ctn > div > div.mobile_scroll",$("div.inp-inner > input.inp").val(),self)
   })

   //###################################################
   $(document).on('click', '.entry_btn.black', () => {
     if (!self.filters.isNumber($("div.inp-inner > input.inp").val())) return alert("Valor invalido")
     if (!self.filters.minLength($("div.inp-inner > input.inp").val(), 1)) return alert("Valor invalido")
     //if (self.filters.logged(UserLogged)) return alert("Voce precisa esta logado!")
     // FAZER O EMIT PARA SABER SE O USUARIO ESTA LOGADO
     //
     self.responsive.addUser(1,"div.col_one_third.black > div.player_entry > div.entries-ctn > div > div.mobile_scroll",$("div.inp-inner > input.inp").val(),self)
   })
  }

  init(App) {

    const self = this;

      self.actions(self, App);

      App.on(self.Routes.Roullete, function(data){
        self.responsive.rotate(data)
        self.responsive.addNumberWin(data)
        console.log(data)
      })

      App.on(self.Routes.RoulleteTime, function(data){
        self.responsive.addNumbersWin(data)
        self.responsive.alertRotation(data)
        console.log(data)
      })

  }

}
$(document).ready(function () {
  new AppRoullete().init(AppIo);
})