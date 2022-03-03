//引入 axios
import axios from "axios";
//判断环境如果是developement 用api 如果是上线则用右边的地址请求
//  如果等于developement用api 否则是网址
axios.defaults.withCredentials

axios.create({
  timeout: 4000,
  withCredentials: true // 开启携带认证允许跨域携带cookie信息
});
export default axios; //暴露






