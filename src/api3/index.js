//导入api
import requests from './request';

// 获取登录的ip信息  搜狐的ip接口
 export const loginInfors=()=>requests({
     url:'/loginInfo/cityjson?ie=utf-8'
 });
