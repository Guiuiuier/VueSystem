//导入api
import requests from './request';
// 获取后端人员管理信息
 export const personnelInfo=()=>requests({
    url:'/personnelInfo/persons/personnel.php',
    method:"get",
 })

// 新增人员
// 曹难怪一直报错
 export const newPer=(perId,perName,gender,age,part,address,contact,perState)=>requests({
   url:'/personnelInfo/persons/newPer.php',
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
     url:'/personnelInfo/persons/perDelet.php',
     method:"POST",
     data:{
        Id,
     }
 })

//  修改
export const updatePer=(id,perId,perName,gender,age,part,address,contact,perState)=>requests({
   url:'/personnelInfo/persons/perUpdate.php',
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


// 从数据库获取登录日志信息

 export const LoginLogInfors=()=>requests({
     url:"/personnelInfo/loginLog/LoginLog.php",
     method:"get"
 })

//  查询数据库登录的人的日志信息
 export const searchLogInfors=(user)=>requests({

    url:"/personnelInfo/loginLog/searchId.php",
    method:"post",
    data:{
       user,
    }
 })

//  插入日志信息
 export const insertLog=(user,lastIp,lastTime,thisIp,thisTime)=>requests({

  url:"/personnelInfo/loginLog/insertLog.php",
  method:"post",
  data:{
     user,
     lastIp,
     lastTime,
     thisIp,
     thisTime,
  }

});

  //上传文件
  export const uploadFile=(formData)=>requests({
     method:"post",
     url:"/personnelInfo/contract/upload.php",
     headers: { 'Content-Type': 'multipart/form-data'},
     data:formData //formdata本身就是一个对象千万别他妈的加了大括号了 整整三天啊整整三天
  })
//   真超级大坑！！！！


//查询模板合同
export const Fileinfors=()=>requests({
 url:"/personnelInfo/contract/fileInfors.php",
  method:"get",
})

export const downloadFile=(fileName)=>requests({
    url:"/personnelInfo/contract/downloadFile.php",
    headers:{   'Content-Type': 'application/x-www-form-urlencoded'},
    method:"get",
    params:{
       fileName
    }
})

// export const DeletFile=()=>requests({
//    url:"/personnelInfo/contract/fileUpdate.php"
// })