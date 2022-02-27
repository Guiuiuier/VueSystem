//导入api
import requests from './request';

// 获取后端人员管理信息
 export const personnelInfo=()=>requests({
    url:'/personnel.php',
    method:"get",
 })