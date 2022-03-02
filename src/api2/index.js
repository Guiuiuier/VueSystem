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
// 删除

 export const deletPer=(Id)=>requests({
     url:'/perDelet.php',
     method:"POST",
     data:{
        Id,
     }
 })

//  修改
export const updatePer=(id,perId,perName,gender,age,part,address,contact,perState)=>requests({
   url:'/perUpdate.php',
   method:"post",
   data:{
      id,
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