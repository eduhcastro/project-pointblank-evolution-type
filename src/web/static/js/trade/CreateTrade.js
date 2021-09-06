class CreateTrade {
  Domain = "http://localhost:8080"
  Backgrounds = ["linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)", "linear-gradient(to right, red , yellow)", "linear-gradient(to bottom, #000099 0%, #ff99cc 100%)", "linear-gradient(to bottom, #00cc66 0%, #ff99cc 100%)", "linear-gradient(to bottom, #9900cc 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ffcc00 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ffffff 0%, #ff99cc 100%)", "linear-gradient(to bottom, #ff00ff 0%, #6699ff 100%)", "linear-gradient(to bottom, #99ff66 0%, #6699ff 100%)"]

  Filters = {

      Title: (string) => {
          if (typeof string === 'undefined' || string === '' || string.length < 1) {
              return {
                  status: false,
                  error: "Invalid title"
              }
          }
          if (string.length > 50) {
              return {
                  status: false,
                  error: "Max length in title"
              }
          }
          return {
            status: true
          }
      },

      Category: (string) => {
          if (typeof string === 'undefined' || string === '' || string.length === 0) {
              return {
                  status: false,
                  error: "Select a category"
              }
          }
          return {
            status: true
          }
      },

      Description: (string) => {
          if (typeof string === 'undefined' || string === '' || string.length < 1) {
              return {
                  status: false,
                  error: "Input description invalid"
              }
          }

          if (string.length > 50) {
              return {
                  status: false,
                  error: "Input description max length"
              }
          }
          return {
            status: true
          }
      },

      ThumbNail: (string) => {
          if (typeof string === 'undefined' || string === '' || string.length > 1 || string.attr("data-thumb") === 'undefined' || parseInt(string.attr("data-thumb")) < 1) {
              return {
                  status: false,
                  error: "Select One ThumbNail."
              }
          }
          if (parseInt(string.attr("data-thumb")) > 6) {
              return {
                  status: false,
                  error: "Invalid ThumbNail"
              }
          }
          return {
            status: true
          }
      },

      Background: (string) => {
          if (typeof string === 'undefined' || string === '' || string.length > 1 || string.length === 0) {
              return {
                  status: false,
                  error: "Select one background"
              }
          }
          if (parseInt(string.text()) > 9) {
              return {
                  status: false,
                  error: "Invalid background"
              }
          }
          return {
            status: true
          }
      },

      isPrivate: (string) => {
          if (typeof string === 'undefined' || typeof string !== 'boolean' || string === '') {
              return {
                  status: false,
                  error: "Public invalid"
              }
          }
          return {
            status: true
          }
      }

  }

  Actions = (self) => {

      let selectCategory = $(".category-imgs > img").click(function() {
          if (typeof $(this).attr('class') === 'undefined' || $(this).attr('class') === '') {
              $(".category-imgs.item").append('<img src="' + $(this).attr('src') + '">')
              return $(this).addClass("selected")
          }
          $(".category-imgs.item > img[src$='" + $(this).attr('src') + "']").remove()
          return $(this).removeClass("selected")
      })

      let selectThumb = $(".icons-imgs > img").click(function() {
          $(".icons-imgs > img").removeClass("selected")
          $(".modal-items-item > img.item").attr('src', $(this).attr('src'))
          return $(this).addClass("selected")
      })

      let inputTitle = $("#Title-input").keyup(function() {
          $("div.title > h3").text($(this).val())
      })

      let inputDescription = $("#Input-description").keyup(function() {
          $(".rounded-circle.avatar").attr("data-bs-original-title", `<b style='color: #ffc659'>${user}</b><br><span>${$(this).val()}</span>`)
      })

      let selectBackground = $(".pagination.pagination-lg > a").click(function() {
        console.log('EPA')
          $(".pagination.pagination-lg > a > div").removeClass("active")
          $(this).children().addClass("active")
          $(".modal-items-item").css("background", self.Backgrounds[parseInt($(this).attr("data-background"))])
      })

      let checkBoxPrivateSession = $('#Input-public-check').click(function() {
          $(".alert.alert-warning.public").toggle(!this.checked);
      })


  }

  Create = (self) => {
      $(".w-100.btn.btn-lg.btn-primary").click(function() {
          const Title =       $("#Title-input").val()
          const Category =    $(".category-imgs > img.selected")
          const Description = $("#Input-description").val()
          const ThumbNail =   $(".icons-imgs > img.selected")
          const Background =  $(".pagination.pagination-lg > a > div.active")
          const Public =      $("#Input-public-check").is(':checked')
          const SaveCategory = []

          if(!self.Filters.Title(Title).status){
            return alert(self.Filters.Title(Title).error)
          }

          if(!self.Filters.Category(Category).status){
            return alert(self.Filters.Category(Category).error)
          }

          if(!self.Filters.Description(Description).status){
            return alert(self.Filters.Description(Description).error)
          }

          if(!self.Filters.ThumbNail(ThumbNail).status){
            return alert(self.Filters.ThumbNail(ThumbNail).error)
          }

          if(!self.Filters.Background(Background).status){
            return alert(self.Filters.Background(Background).error)
          }

          if(!self.Filters.isPrivate(Public).status){
            return alert(self.Filters.isPrivate(Public).error)
          }
          console.log()
          Category.each(function() {
              SaveCategory.push(parseInt($(this).attr('data-category')))
          })

          $.post("/app/trade/create", {
              title: Title,
              categorys: SaveCategory,
              description: Description,
              thumbnail: parseInt(ThumbNail.attr("data-thumb")),
              background: parseInt(Background.parent().attr("data-background")),
              publictype: Public
          }, function(e) {
              if (!e.status) {
                  return alert("it was not possible to create a trade")
              }
              if (Public === 'true') {
                  alert("Copy the link and send to your frined")
                  window.open(domain + "/app/trade/exchange2/" + e.sessionkey)
                  return window.location.replace(domain);
              }
              window.open(domain + "/app/trade/exchange2/?token=" + e.sessionkey)
              return window.location.replace(domain)
          })
      })
  }

  init(){
    const Self = this
    Self.Actions(Self)
    Self.Create(Self)
  }
}

$(window).on('load', function() {
  new CreateTrade().init()
})