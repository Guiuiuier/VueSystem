# 人力资源管理系统
  
 遇到的bug 修复后在 src文件夹下的

   https://github.com/Guiuiuier/VueSystem/blob/main/src/tips.md 
 
 
请安装依赖  在文件根目录下输入这个命令 进行处理    

  cnpm install --save less less-loader@5  

 安装的时候要注意版本否则会报getoptions is not functions 所以这里安装5版本  
  bootstrap的版本要4.5.3的否则会样式冲突   
 引入bootstrap模板 

  npm install vue bootstrap-vue bootstrap@4.5.3

     请下载nprogress进度条插件 0.2.0版本  
    https://github.com/rstacruz/nprogress 
    npm install --save nprogress  
   代码使用：Nprogress start()开始进度条  
      Nprogress done()  关闭进度条  


  npm install echarts --save 下载echarts饼状图插件  

 ## 关于后端PHP 数据库管理采用的是wamp3.2.3.3版本（请自行到网上下载后边的可自带）  PHP为7.4.9 Apache 2.4.46 PHPmyadmin 5.02



//打卡逻辑这个需要根据用户当月的排班来设计不同的打卡逻辑 这里只设计了一个 正常上下班 即早班的规则 9:30 18:30 是上下班时间  并且各种情况都有可能发生 例如 （提早下班？等等 请假？ 等） 
 //逻辑如果最近一次打卡大于前一天打卡 重新设置上下班flag 
 //由于Vue的机制，在点击加载时间后他不会重新渲染 需要重新自行刷新网页 才可以看见渲染的数据。 由于一些原因（主要还是懒，因为调试忘了加进去了） 可以模拟重新刷新。 这里采用的方法是每次点击事件后跳转到一个空白页面（极快的）后跳转到原页面， 即可实现，这是许多程序员都会做的（如果项目不特别大，因为他会浪费一些性能）当然还有更好的办法，但这个简单粗暴！ 
**** 
## 项目流程图
## 导航栏
   ![asdasd](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%BE%A7%E8%BE%B9%E6%A0%8F.png)  
   ![流程图](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B5%81%E7%A8%8B.png)  
## 以下是登录模块的逻辑  
  ![逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)  
  ![登录逻辑](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/%E7%99%BB%E5%BD%95%E9%80%BB%E8%BE%91.png)  
  
      增加了了登录验证功能，例如添加了路由守卫 防止用户恶意进行token修改或者不通过token就进入后端  

### 登录页面 
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/5902d342247d8ffd3e0bbf7c1b380c9.png)  
  ![登录页](https://github.com/Guiuiuier/VueHRsystem/blob/main/public/Introduce%20image/ff6928a06d706a1bb6263c3771a9c26.png)  
### 人员管理页面
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%BB%E9%A1%B5%E9%9D%A2.png)   
#### 搜索
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%90%9C%E7%B4%A2%E6%9D%BF%E5%9D%97.png)   
#### 添加
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%B7%BB%E5%8A%A0%E6%9D%BF%E5%9D%97.png)   
#### 编辑
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E7%BC%96%E8%BE%91%E6%9D%BF%E5%9D%97.png)   

### 登陆日志
 ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E7%99%BB%E9%99%86%E6%97%A5%E5%BF%97.png)   
  ![登录逻辑](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%9B%B4%E6%94%B9%E5%AF%86%E7%A0%81.png)   

### 合同模板
 #### 编辑
 ![ads](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%BF%AE%E6%94%B9%E4%B8%8B%E8%BD%BD%E4%BF%A1%E6%81%AF.png)  
 #### 下载模板
  ![ads](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8B%E8%BD%BD.png)   
  
  #### 上传模板
  ![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8A%E4%BC%A0.png)  
### 考勤打卡
  ![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E8%80%83%E5%8B%A4%E6%89%93%E5%8D%A1.png)  
   ![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E4%B8%8B%E7%8F%AD%E6%89%93%E5%8D%A11.png)  

## 数据库表
![上传](https://github.com/Guiuiuier/VueSystem/blob/main/public/Introduce%20image/%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8.png)  
