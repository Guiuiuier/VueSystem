//导入api
import requests from './request';

// 获取后端人员管理信息
 export const personnelInfo=()=>requests({
    url:'/personnel.php',
    method:"get",
 })

// 新增人员
// 曹难怪一直报错
 export const newPer=(perId,perName,gender,age,part,address,contact,perState)=>requests({
   url:'/newPer.php',
   method:"post",
   // post传参才要data其余的可以要可以不要
   // 因为params是添加到url的请求字符串中的，用于get请求。 
// 而data是添加到请求体（body）中的， 用于post请求。
   data:{
      perId,
      perName,
      gender,
      age,
      part,
      address,
      contact,
      perState,
   }
})