interface IfindRouter{
    method: string
    path: string
    callback: any
}

const routesControl = [
    {method: "GET", type: "NORMAL", path: "/",           protected: false, authblock: false},
    {method: "GET", type: "NORMAL", path: "/app/logout", protected: true, authblock: false},
    {method: "GET", type: "NORMAL", path: "/app/authenticate", protected: false, authblock: true},
    {method: "POST",type: "API", path: "/app/authenticate", protected: false, authblock: true},
    {method: "GET", type: "NORMAL", path: "/app/trade", protected: true, authblock: false},
    {method: "POST",type: "API", path: "/app/chat/load", protected: false, authblock: false},
    {method: "POST",type: "API", path: "/app/chat/search",protected: false,authblock: false},
    {method: "POST",type: "API", path: "/app/chat/send", protected: true, authblock: false},
    {method: "GET", type: "NORMAL", path: "/app/trade/create", protected: true, authblock: false},
    {method: "POST",type: "API", path: "/app/trade/create", protected: true, authblock: false},
    {method: "GET", type: "NORMAL",path:"/app/trade/exchange", protected: true, authblock: false},
    {method: "GET", type: "NORMAL",path:"/app/trade/finish", protected: true, authblock: false},
    {method: "GET", type: "NORMAL",path:"/app/roulette",     protected: false, authblock: false},
    {method: "GET", type: "NORMAL",path:"/app/user/profile", protected: true,  authblock: false}
  ]

  export function search(method: string, path: string, callback: any){ return callback(routesControl.find(function(post, index) {
    if(post.method === method && post.path === path){
      return true
    }
    }))
  }