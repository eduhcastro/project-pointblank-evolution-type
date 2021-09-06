var domain = "http://localhost:8080"

const Chat = {

  injectMessage: (data) => {
    if($(".chat_msgs > ul.messages").children().length > 30){
      for(var i = $(".chat_msgs > ul.messages").children().length; i > 30; i--){
        if(i > 30){
          $(".chat_msgs > ul.messages").find('li:first').remove();
        }
      }
    }

    for(var Messages of data){
      if(typeof $('*[data-message="'+Messages.id+'"]').html() === 'undefined'){
        $(".chat_msgs > ul.messages").append(` <li tabindex="1" data-message="${Messages.id}" class="chat_msg msg-user-message">
        <div class="colorbar user"></div>
        <span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span>
     </li>`)
        $('.chat_msgs > ul.messages > li').last().addClass('active-li').focus();
        $('.chat_msgs > ul.messages > li').removeClass('active-li')
        $('.chat_msgs > ul.messages > li').removeAttr("tabindex")
      }
    }
  },

  searchMessage: () => {
    $.post(`${domain}/app/chat/search`, function(data){
      return Chat.injectMessage(data)
    })
  },

  sendMessage: (message) => {
    $.post(`${domain}/app/chat/send`,{message: message}, function(data){
      if(!data.status){
        return alert('Login first!')
      }
      console.log('Message sent')
      })
  },

  loadMessages: () => {
      $.post(`${domain}/app/chat/load`, 
          function(data){
          for(var Messages of data){
          $(".chat_msgs > ul.messages").append(` <li data-message="${Messages.id}" class="chat_msg msg-user-message">
          <div class="colorbar user"></div>
          <span class="user chat_user"><span class="chat_user_prof"><img src="${Messages.picture}"></span><span class="xp_60"><img src="/images/ranks/bronze.png" alt="Rust - lvl 17"/><span class="level_val">${Messages.level}</span></span><a class="chat_user_name">${Messages.name}</a><span class="chat_user_ico"><span class="chat_user_colen">:</span></span></span><span class="chat_cont">${Messages.message}</span>
       </li>`)
          }
      })
  },

  actionsMessages: () => {

    const SendByIcon = $(".chat_send").click(function() {
      const Mensagem = $('input.chat_input').val()
      if (Mensagem.length === 0) {
          return alert('Type something first!')
      }
      $('input.chat_input').val('')
      return Chat.sendMessage(Mensagem)
    })
    
    const SendByKeyPress = $("input.chat_input").keyup(function(e) {
      if ((e.keyCode || e.which) == 13) {
          const Mensagem = $('input.chat_input').val()
          if (Mensagem.length === 0) {
              return alert('Type something first!')
          }
          $('input.chat_input').val('')
          return Chat.sendMessage(Mensagem)
      }
    })
    
    const CleanInput = $("a.emoji").click(function() {
      return $('input.chat_input').val('')
    })

  }

}



$(window).on('load', function() {
  //setInterval(function(){ 
  //  Chat.searchMessage()
  //}, 3000)
  //Chat.loadMessages()
  Chat.actionsMessages()
 })
