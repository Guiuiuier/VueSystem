module.exports = {
  lintOnSave: false,
  devServer:{
  // port:8080,//设置项目端口号
  // host:'0.0.0.0' ,//允许所有主机访问
   
  proxy:{
    
      '/api':{  //匹配到api调用地址
      target:"http://rap2api.taobao.org/app/mock/298235", //目标服务器
      pathRewrite:{
        '^/api': ''   //重写路径 http://XX.XX.XX.XX:8080/api/login
      }
    },
    '/personnelInfo':{  //匹配到api调用地址
      target:"http://localhost/PHPapi", //目标服务器
      pathRewrite:{
        '^/personnelInfo': ''   //重写路径 http://XX.XX.XX.XX:8080/api/login
      }
    },
    }
  }

    // proxy: {  //配置跨域
  //   '/api': {
  //     target: 'http://rap2api.taobao.org/app/mock/298235/user',  //这里后台的地址模拟的;应该填写你们真实的后台接口
  //     changOrigin: true,  //允许跨域
  //     pathRewrite: {
  //       /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
  //         实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
  //        */
  //       '^/api': '' 
  //     }
  //   },
  // }
  //}
}
