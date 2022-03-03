module.exports = {
  lintOnSave: false,
  devServer:{
  // port:8080,//设置项目端口号
  // host:'0.0.0.0' ,//允许所有主机访问
   
  proxy:{
      // 请求rap2的地址
      '/api':{  //匹配到api调用地址
      target:"http://rap2api.taobao.org/app/mock/298235", //目标服务器
      pathRewrite:{
        '^/api': ''   //重写路径 http://XX.XX.XX.XX:8080/api/login
      }
    },
    // 请求后端的用户信息地址
    '/personnelInfo':{  //匹配到api调用地址
      target:"http://localhost/PHPapi", //目标服务器
      pathRewrite:{
        '^/personnelInfo': ''   //重写路径 http://XX.XX.XX.XX:8080/api/login
      }
    },

    // 登录日志地址
    '/loginInfo':{
      target:"http://pv.sohu.com",
      pathRewrite:{
        '^/loginInfo':''
      }
    },
    }
  }


}
