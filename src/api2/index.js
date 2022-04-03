//导入api
import requests from './request';


// 更改api 自写数据库
export const login = (username, password) => requests({
  url: '/personnelInfo/login/user.php',
  method: 'post',
  data: {
    //这里是请求的内容 看服务器要求  不是必选可以不写
    username,
    password,
  }
});







// 获取后端人员管理信息
export const personnelInfo = () => requests({
  url: '/personnelInfo/persons/personnel.php',
  method: "get",
})

// 新增人员
// 曹难怪一直报错
export const newPer = (perName, gender, age, part, address, contact, perState, position, hireTime) => requests({
  url: '/personnelInfo/persons/newPer.php',
  method: "post",
  data: {
    perName,
    gender,
    age,
    part,
    address,
    contact,
    perState,
    position,
    hireTime
  }
})
// 删除

export const deletPer = (Id) => requests({
  url: '/personnelInfo/persons/perDelet.php',
  method: "POST",
  data: {
    Id,
  }
})

//  修改
export const updatePer = (id, perId, perName, gender, age, part, address, contact, perState, position, hireTime, fireTime) => requests({
  url: '/personnelInfo/persons/perUpdate.php',
  method: "post",
  data: {
    id,
    perId,
    perName,
    gender,
    age,
    part,
    address,
    contact,
    perState,
    position,
    hireTime,
    fireTime,
  }
})


// 从数据库获取登录日志信息

export const LoginLogInfors = () => requests({
  url: "/personnelInfo/loginLog/LoginLog.php",
  method: "get"
})

//  查询数据库登录的人的日志信息
export const searchLogInfors = (user) => requests({

  url: "/personnelInfo/loginLog/searchId.php",
  method: "post",
  data: {
    user,
  }
})

//  插入日志信息
export const insertLog = (user, lastIp, lastTime, thisIp, thisTime) => requests({

  url: "/personnelInfo/loginLog/insertLog.php",
  method: "post",
  data: {
    user,
    lastIp,
    lastTime,
    thisIp,
    thisTime,
  }

});

//上传文件
export const uploadFile = (formData) => requests({
  method: "post",
  url: "/personnelInfo/contract/upload.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: formData //formdata本身就是一个对象千万别他妈的加了大括号了 整整三天啊整整三天
})
//   真超级大坑！！！！


//查询模板合同
export const Fileinfors = () => requests({
  url: "/personnelInfo/contract/fileInfors.php",
  method: "get",
})

//下载文件
export const downloadFile = (fileName) => requests({
  url: "/personnelInfo/contract/downloadFile.php",
  responseType: 'blob',
  headers: {
    'Content-Type': 'file'
  },
  method: "get",
  params: {
    fileName
  },
})
export const downloadFile_em = (fileName) => requests({
  url: "/personnelInfo/contract/downloadFile_em.php",
  responseType: 'blob',
  headers: {
    'Content-Type': 'file'
  },
  method: "get",
  params: {
    fileName
  },
})
export const clockeventDealy = (id, name, currentTime, clockStateDelay, clockType, monthsTime,part) => requests({
  url: "/personnelInfo/persons/clockeventDealy.php",
  method: "post",
  data: {
    id,
    name,
    currentTime,
    clockStateDelay,
    clockType,
    monthsTime,
    part,
  }
})
//删除文件
export const DeletFile = (id, fileName) => requests({
  url: "/personnelInfo/contract/fileDelet.php",
  method: "post",
  data: {
    id,
    fileName,
  }
})
export const DeletFile_em = (id, fileName, username) => requests({
  url: "/personnelInfo/contract/fileDelet_em.php",
  method: "post",
  data: {
    id,
    fileName,
    username,
  }
})

//更改用户密码
export const updatePass = (username, userpass, token) => requests({
  url: "/personnelInfo/login/updatepass.php",
  method: 'post',
  data: {
    username,
    userpass,
    token
  }
})


//考勤打卡
export const clockIn = (idPer, namePer, clockTime, clockState, clockType,part) => requests({
  url: "/personnelInfo/attendance/clockTime.php",
  method: "post",
  data: {
    idPer,
    namePer,
    clockTime,
    clockState,
    // monthlateness,
    clockType,
    part,
  }
})

//查询打卡列表
export const Clocklists = (idPer) => requests({
  url: "/personnelInfo/attendance/clockLists.php",
  method: "post",
  data: {
    idPer,
  }
})

//添加登录用户
export const newUsers = (idPer, userpass, username, part, role, email) => requests({
  url: "/personnelInfo/users/newUsers.php",
  method: "post",
  data: {
    idPer,
    part,
    username,
    userpass,
    role,
    email
  }
})

//登录用户信息表
export const searchUsers = () => requests({

  url: "/personnelInfo/users/searchUsers.php",
  method: "get",
})
export const deletUsers = (id) => requests({
  url: "/personnelInfo/users/deletUsers.php",
  method: "post",
  data: {
    id,
  }
})
export const updateUsers = (id, perName, part, role) => requests({
  url: "/personnelInfo/users/updateUsers.php",
  method: "post",
  data: {
    id,
    perName,
    part,
    role
  }

})

//公司公告页面
export const allAnnounce = () => requests({
  url: "/personnelInfo/announcement/announce.php",
  method: "get",
})

//查询文公告文章
export const announceId = (id) => requests({
  url: "/personnelInfo/announcement/announceId.php",
  method: "get",
  params: {
    id
  }
})

export const announceDelet = (id) => requests({
  url: "/personnelInfo/announcement/announceDelet.php",
  method: "get",
  params: {
    id
  }
})

export const announceEdit = (id, topic, endName, toPerson, content) => requests({
  url: "/personnelInfo/announcement/announceEdit.php",
  method: "post",
  data: {
    id,
    topic,
    endName,
    toPerson,
    content
  }

})

export const announceNew = (user, topic, endName, toPerson, content, currentTimes) => requests({
  url: "/personnelInfo/announcement/announceNew.php",
  method: "post",
  data: {
    user,
    topic,
    endName,
    toPerson,
    content,
    currentTimes,
  }

})

export const updateFile = (formData) => requests({
  method: "post",
  url: "/personnelInfo/contract/fileUpdate.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: formData //formdata本身就是一个对象千万别他妈的加了大括号了 整整三天啊整整三天
})

export const updateFileWord = (username, currentTime, id, part, tips) => requests({
  method: "post",
  url: "/personnelInfo/contract/fileUpdate.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    username,
    currentTime,
    id,
    part,
    tips,
  }
})


export const EmpersonnelInfo = () => requests({
  url: '/personnelInfo/persons/Empersonnel.php',
  method: "get",
})

export const updateFileWord_Em = (username, currentTime, id, part, tips) => requests({
  method: "post",
  url: "/personnelInfo/contract/fileUpdate_Em.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    username,
    currentTime,
    id,
    part,
    tips,
  }
})

export const updateFile_em = (formData) => requests({
  method: "post",
  url: "/personnelInfo/contract/fileUpdate_em.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: formData //formdata本身就是一个对象千万别他妈的加了大括号了 整整三天啊整整三天
})

export const Assessor = (part) => requests({
  method: "get",
  url: "/personnelInfo/users/assessor.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    part,
  }
})

export const vacation = (idPer, name, vacationType, day, part, contact, startTime, endTime, content, assessor, currentTime) => requests({
  method: "post",
  url: "/personnelInfo/persons/vacation.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    idPer,
    name,
    vacationType,
    day,
    part,
    contact,
    startTime,
    endTime,
    content,
    assessor,
    currentTime
  }
})


export const vacationLists = (idPer) => requests({
  method: "get",
  url: "/personnelInfo/persons/vacationLists.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    idPer,
  }

});

export const cancelRequest = (id) => requests({
  method: "get",
  url: "/personnelInfo/persons/cancelRequest.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    id,
  }

})
export const vacationUpdate = (vacationType, day, contact, startTime, endTime, content, assessor, clockTime, id) => requests({
  method: "post",
  url: "/personnelInfo/persons/vacationUpdate.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    vacationType,
    day,
    contact,
    startTime,
    endTime,
    content,
    assessor,
    clockTime,
    id
  }
})

export const vacationmyleave = (id, idPer) => requests({
  method: "get",
  url: "/personnelInfo/persons/vacationmyleave.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    id,
    idPer
  }
})

export const idAll = () => requests({
  method: "get",
  url: "/personnelInfo/persons/idall.php",
})

export const allUsername = () => requests({
  method: "get",
  url: "/personnelInfo/users/allUsername.php",
})

export const isClock = (clockTime, id) => requests({
  method: 'get',
  url: "/personnelInfo/persons/isClock.php",
  params: {
    clockTime,
    id,
  }
})
export const insertClock = (id, name, currentTime, monthsTime,part) => requests({
  method: 'post',
  url: "/personnelInfo/persons/insertClock.php",
  data: {
    id,
    name,
    currentTime,
    monthsTime,
    part,
  }
});
export const todayDelay = (todayTime,part) => requests({
  method: 'get',
  url: "/personnelInfo/attendance/todayDelay.php",
  params: {
    todayTime,
    part,
  }
});
export const positionNum = (part) => requests({
  method: 'get',
  url: "/personnelInfo/attendance/positionNum.php",
  params: {
    part,
  }
});

export const comattendance = (id, monthsTime) => requests({
  method: 'get',
  url: "/personnelInfo/persons/clockevent.php",
  params: {
    id,
    monthsTime,
  }
})
export const Emclock = (id, thisMonth) => requests({
  method: 'get',
  url: "/personnelInfo/persons/Emclock.php",
  params: {
    id,
    thisMonth,
  }
})
export const loginCode = (username) => requests({

  method: "post",
  url: "/personnelInfo/users/loginCode.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    username,
  }
})
export const sendMail = (contact) => requests({

  method: "post",
  url: "/personnelInfo/users/sendMail.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    contact,
  }
})
export const verify = (mail, code) => requests({

  method: "post",
  url: "/personnelInfo/users/sendMail.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    mail,
    code,
  }
})
export const myPass = (username) => requests({

  method: "post",
  url: "/personnelInfo/users/mypass.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  data: {
    username,
  }
})

export const Empersons_part = (part) => requests({

  method: "get",
  url: "/personnelInfo/persons/Empersons_part.php",
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    part,
  }
})