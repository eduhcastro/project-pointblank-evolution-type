class AppChat {
    Web = "http://localhost:8080"
    Room = "Chat"

    Routes = {
        RoomJoin: `RoomJoin`,
        Load: `Load`,
        Send: `SendMessage`,
        Message: `Message`
    }

    cleanMessages() {
        if ($(".chat_msgs > ul.messages").children().length > 30) {
            console.log('XX')
            for (var i = $(".chat_msgs > ul.messages").children().length; i > 30; i--) {
                if (i > 30) {
                    $(".chat_msgs > ul.messages").find('li:first').remove();
                }
            }
        }
    }

    insertMessage(data) {
        if ($(".chat_msgs > ul.messages").children().length > 30) {
            console.log('XX')
            for (var i = $(".chat_msgs > ul.messages").children().length; i > 30; i--) {
                if (i > 30) {
                    $(".chat_msgs > ul.messages").find('li:first').remove();
                }
            }
        }

        for (var Messages of data.Messages) {
            if (typeof $('*[data-message="' + Messages.id + '"]').html() === 'undefined') {
                $(".chat_msgs > ul.messages").append(` <li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message">
      <div class="colorbar user"></div>
      <span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span>
   </li>`)
                $('.chat_msgs > ul.messages > li').last().addClass('active-li').focus();
                $('.chat_msgs > ul.messages > li').removeClass('active-li')
                $('.chat_msgs > ul.messages > li').removeAttr("tabindex")
            }
        }
    }

    sendMessage(message, app, self) {
        app.emit(self.Routes.Send, {
            message
        })
    }

    actionsMessages(self, app) {

        const SendByIcon = $(".chat_send").click(function () {
            const Mensagem = $('input.chat_input').val()
            if (Mensagem.length === 0) {
                return alert('Type something first!')
            }
            $('input.chat_input').val('')
            $('div.emojionearea-editor').text('')
            return self.sendMessage(Mensagem, app, self)
        })

        const CleanInput = $("a.emoji").click(function () {
            return $('input.chat_input').val('')
        })

        const Emojis = $("input.chat_input").emojioneArea({
            search: false,
            hideSource: true,
            pickerPosition: "top",
            filtersPosition: "top",
            tones: false,
            autocomplete: false,
            inline: true,
            hidePickerOnBlur: true
        })

        //const SendByKeyPress = $("div.chat_input_contain").keyup(function(e) {
        //    if ((e.keyCode || e.which) == 13) {
        //        const Mensagem = $('input.chat_input').val()
        //        if (Mensagem.length === 0) {
        //            return alert('Type something first!')
        //        }
        //        $('input.chat_input').val('')
        //        return self.sendMessage(Mensagem, app, self)
        //    }
        //})
    }


    init() {
        var Self = this
        var App = io(this.Web)

        App.on('connect', function (self = Self) {

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
                console.log('Em tunel com o Chat')
            })

            /**
             * Dados Do Chat  
             */
            App.on(self.Routes.Load, (data) => {
                App.off(self.Routes.Load)
                self.insertMessage(data.Messages)
            })

            /**
             * Enviando Mensagem
             */
            App.on(self.Routes.Send, (data) => {
                if (!data.status) {
                    return alert(data.error)
                }
                self.cleanMessages()
                console.log('Message sent')
            })

            /**
             * Recebendo Mensagem
             */
            App.on(self.Routes.Message, (Messages) => {
                $(".chat_msgs > ul.messages").append(`<li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message"><div class="colorbar user"></div><span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span></li>`)
                $('.chat_msgs > ul.messages > li').last().addClass('active-li').focus();
                $('.chat_msgs > ul.messages > li').removeClass('active-li')
                $('.chat_msgs > ul.messages > li').removeAttr("tabindex")
            })


            self.actionsMessages(self, App)
        })
    }
}

$(document).ready(function () {
    new AppChat().init()
})