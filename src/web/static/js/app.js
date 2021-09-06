"use strict";

class AppZEvolution {

  Web = "http://localhost:8080"

  constructor(io) {
    this.io = io
  }

  socket = () => {
    return this.io(this.Web)
  }

  responsive = {

    clicks: () => {

      $(".sc-hTRkXV.sc-hhIiOg.sc-eirqVv.enlJuL.iwisNA.dSzotL").click(function () {
        window.location.replace("/app/authenticate")
      })

      $(".dropdown-item.logout").click((e) => {
        $.post(`${domain}/app/logout`, function () {
          location.reload()
        })
      })

    },

    events: () => {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip({ html: true })
      })
    }
  }

  tools = {

    getParameterByName: (name, url = window.location.href) => {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
  }

  init = () => {
    this.responsive.clicks()
    this.responsive.events()
  }
}


let AppEvolution = new AppZEvolution(io)
const AppInit = AppEvolution.init()
const AppIo  =  AppEvolution.socket();
const domain =  AppEvolution.Web
const Tools  =  AppEvolution.tools







