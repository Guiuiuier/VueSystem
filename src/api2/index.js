//导入api
import requests from './request';

// 获取后端人员管理信息
 export const personnelInfo=()=>requests({
    url:'/personnel.php',
    method:"get",
 })

// 新增人员
 export const newPer=()=>requests({
   url:'/newPer.php?&perId="1"&&perName="2"',
   method:"post",
   data:{
      // perId,
      // perName,
      // gender,
      // age,
      // part,
      // address,
      // contact,
      // perState,
   }
})