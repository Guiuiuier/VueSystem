//导入api
import requests from './request';
  //用户信息
export const login=(username,password)=>requests({
 url:'/user',
 method:'post',
 data:{
        //这里是请求的内容 看服务器要求  不是必选可以不写
      username,
      password,
 }
});
 //登录日志
export const getLoginLog=()=>requests({
     url:'/user/userlog',
     method:'get',
})
// export const personnelManagement =()=>{
//      //发请求
//      return requests({url:'',method:'post'});
// };
// export const loginCheck =params=>{
//      //发请求
//      return requests({url:'/login/index',method:'post'});
// };
