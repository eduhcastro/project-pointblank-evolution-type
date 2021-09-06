class AppChat{
    constructor(tools){
        this.tools = tools
    }
    Room = "Chat"
    Routes = {
        RoomJoin: `RoomJoin`,
        Load: `Load`,
        Send: `SendMessage`,
        Message: `Message`,
        MessageTrade : () => {
            return `Message::${this.tools.getParameterByName('token')}`
        }
    }


    ChatGlobal = {

        cleanMessages() {
            if ($(".chat_msgs > ul.messages.global").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.global").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.global").find('li:first').remove();
                    }
                }
            }
        },
    
        insertMessage(data) {
            if ($(".chat_msgs > ul.messages.global").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.global").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.global").find('li:first').remove();
                    }
                }
            }
    
            for (var Messages of data.Messages) {
                if (typeof $('*[data-message="' + Messages.id + '"]').html() === 'undefined') {
                    $(".chat_msgs > ul.messages.global").append(` <li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message">
                    <div class="colorbar user"></div>
                    <span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span>
                    </li>`)
                    $('.chat_msgs > ul.messages.global > li').last().addClass('active-li').focus();
                    $('.chat_msgs > ul.messages.global > li').removeClass('active-li')
                    $('.chat_msgs > ul.messages.global > li').removeAttr("tabindex")
                }
            }
        },
    
        insertTradeMessage(data) {
            if ($(".chat_msgs > ul.messages.global").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.global").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.global").find('li:first').remove();
                    }
                }
            }
        },
    
        sendMessage(message, app, self) {
    
           //if(getParameterByName('token')){
           //    return app.emit(`${self.Routes.Send}::${getParameterByName('token')}`, {
           //     message
           // })
           //}
    
            app.emit(self.Routes.Send, {
                message
            })
        }
    }

    ChatTrade = {
        cleanMessages() {
            if ($(".chat_msgs > ul.messages.trade").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.trade").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.trade").find('li:first').remove();
                    }
                }
            }
        },
    
        insertMessage(data) {
            if ($(".chat_msgs > ul.messages.trade").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.trade").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.trade").find('li:first').remove();
                    }
                }
            }
    
            for (var Messages of data.Messages) {
                if (typeof $('*[data-message="' + Messages.id + '"]').html() === 'undefined') {
                    $(".chat_msgs > ul.messages.trade").append(` <li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message">
                    <div class="colorbar user"></div>
                    <span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span>
                    </li>`)
                    $('.chat_msgs > ul.messages.trade > li').last().addClass('active-li').focus();
                    $('.chat_msgs > ul.messages.trade > li').removeClass('active-li')
                    $('.chat_msgs > ul.messages.trade > li').removeAttr("tabindex")
                }
            }
        },
    
        insertTradeMessage(data) {
            if ($(".chat_msgs > ul.messages.trade").children().length > 30) {
                for (var i = $(".chat_msgs > ul.messages.trade").children().length; i > 30; i--) {
                    if (i > 30) {
                        $(".chat_msgs > ul.messages.trade").find('li:first').remove();
                    }
                }
            }
        },
    
        sendMessage(message, app, self, token) {
            app.emit(`${self.Routes.Send}`, {
                message,
                token
            })
        }

    }
    
    actionsMessages(self, app) {

        const SendByIcon = $(".chat_send").click(function () {
            const Mensagem = $('input.chat_input').val()
            if (Mensagem.length === 0) {
                return alert('Type something first!')
            }
            if(typeof $('*[data-message="aviso-privado"]') !== 'undefined') $('*[data-message="aviso-privado"]').remove();
            $('input.chat_input').val('')
            $('div.emojionearea-editor').text('')
            if($(".tab.small.selectedChannel").attr("data-target") === '0'){
                return self.ChatGlobal.sendMessage(Mensagem, app, self)
            }
            return self.ChatTrade.sendMessage(Mensagem, app, self, getParameterByName('token'))
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


        const SelectChat = $("div.tab").click(function () {
            if($(this).attr("data-target") === '0'){
             $("ul.messages.global").css("display", "block")
             $("ul.messages.trade").css("display", "none")
            } else {
                $("ul.messages.trade").css("display", "block")
                $("ul.messages.global").css("display", "none") 
            }
            $("div.tab").removeClass("selectedChannel")
            $(this).addClass("selectedChannel")
        })

    }


    init(App) {

        var Self = this
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
                self.ChatGlobal.insertMessage(data.Messages)
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
                $(".chat_msgs > ul.messages.global").append(`<li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message"><div class="colorbar user"></div><span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span></li>`)
                $('.chat_msgs > ul.messages.global > li').last().addClass('active-li').focus();
                $('.chat_msgs > ul.messages.global > li').removeClass('active-li')
                $('.chat_msgs > ul.messages.global > li').removeAttr("tabindex")
            })

            /**
             * Recebendo Mensagem
             */
             App.on(self.Routes.MessageTrade(), (Messages) => {
                $(".chat_msgs > ul.messages.trade").append(`<li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message"><div class="colorbar user"></div><span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span></li>`)
                $('.chat_msgs > ul.messages.trade > li').last().addClass('active-li').focus();
                $('.chat_msgs > ul.messages.trade > li').removeClass('active-li')
                $('.chat_msgs > ul.messages.trade > li').removeAttr("tabindex")
            })

            self.actionsMessages(self, App)
        })
    }
}

$(document).ready(function () {
    new AppChat(Tools).init(AppIo)
})