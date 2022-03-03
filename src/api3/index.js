//导入api
import requests from './request';

// 获取登录的ip信息
 export const loginInfors=()=>requests({
     url:'/loginInfo/cityjson?ie=utf-8'
 });