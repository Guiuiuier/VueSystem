//导入api
import requests from './request';
  //用户信息
export const login=(username,password)=>requests({
 url:'/api/user',
 method:'post',
 data:{
        //这里是请求的内容 看服务器要求  不是必选可以不写
      username,
      password,
 }
});
 //登录日志天气状态
export const getLoginLog=()=>requests({
     url:'/api/user/userlog',
     method:'get',
});
 //这个是管理员的联系方式
export const administratorContact=()=>requests({
  url:'/api/user/contact',
  method:'get',
})