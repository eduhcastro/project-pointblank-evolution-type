var domain = "http://localhost:8080"

$(function () {
  $('[data-toggle="tooltip"]').tooltip({html:true})
})

$(".sc-hTRkXV.sc-hhIiOg.sc-eirqVv.enlJuL.iwisNA.dSzotL").click(function(){
  window.location.replace("/app/authenticate")
})

$(".dropdown-item.logout").click( (e)=>{
  $.post(`${domain}/app/logout`, function(){
    location.reload()
  }) 
})
