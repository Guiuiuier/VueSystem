<template>
  <div>
    <div class="login">
      <div class="login-container">
        <div class="login-container-title">欢迎登录</div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label-for="input-1" description="账户:admin  密码:admin">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
              placeholder="请输入用户名"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              v-model="form.password"
              required
              placeholder="请输入密码"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-4">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" style="float:left">
              <b-form-checkbox>记住密码</b-form-checkbox>
            </b-form-checkbox-group>

            <div class="register_right" style="float:right">
              <router-link to="../find" style="text-decoration:none">忘记密码了?点击这里！</router-link>
            </div>
            <div class="clear" style="clear:both"></div>
          </b-form-group>
          <span class="errorTips" v-if="errTips">账号或密码错误！</span>
          <span class="errorTips" v-if="progressMode">正在登录 请稍等...</span>
          <b-button type="submit" variant="primary">登录</b-button>
          <b-button type="reset" variant="danger">重置</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>


<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: #343a40;
  position: absolute;
  .login-container {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .login-container-title {
      font-size: 26px;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: #eeeeee;
    }
  }
}
.errorTips {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 1;
  left: 50px;
  top: 100%;
}
#input-1 {
  margin-bottom: 10px;
}
#input-2 {
  margin: 10px auto 10px auto; //上左下右
}
#input-group-4 {
  color: white;
  margin: 10px auto 10px auto;
}
.btn-primary {
  width: 100%;
}
.btn-danger {
  width: 100%;
}
.input-group-4 {
  display: flex;
  align-items: center;
}
</style>
<script>
//这里引入已经封装好的api
import { getLoginLog } from "@/api";
import { loginInfors } from "@/api3";
import { login, searchLogInfors, insertLog } from "@/api2";
//映射
import { mapMutations, mapState } from "vuex";
import find from "../find/index";
//获取记住密码框的状态
export default {
  data() {
    return {
      progressMode: false,
      //进度条
      bars: [{ variant: "success", value: 75 }],
      timer: null,
      form: {
        name: "",
        password: "",
        checked: []
      },
      show: true,
      errTips: false
    };
  },
  methods: {
    //映射
    ...mapMutations(["SET_USERINFO"]),
    // 登录代码
    //  收集用户输入的username和password传递给后端
    //登录通过后将返回的token存到本地
    //每次请求的时候 携带token到请求头
    //展示token校验成功的数据
    //校验不通过，跳转到登录页
    onSubmit(evt) {
      let ischecked = document.getElementsByClassName(
        "custom-control-input"
      )[0];
      //  这句不写你可以试试 还能运行不 哈哈 兼容ie系列！
      var event = event | window.event;
      window.event.preventDefault();
      let username = this.form.name;
      let password = this.form.password;
      //  调用api 发送请求
      login(username, password)
        .then(res => {
          // 返回一个对象 转换json 数据对象
          //  console.log(res);
          let infors = Object.values(res.data);
          let userdata = infors[0];
          if (username != userdata.username || password != userdata.userpass) {
            setTimeout(() => {
              this.errTips = true; //错误提示框
              setTimeout(() => {
                this.errTips = false; //错误提示框
              }, 2000);
            }, 1000);
          } else {
            // 进行IP信息请求 请求ip信息并保存
            loginInfors()
              .then(loginInfos => {
                // 搜狐这个接口真XX了。  这里要转换一下
                let infors = loginInfos.data.substring(
                  loginInfos.data.indexOf("{"),
                  loginInfos.data.lastIndexOf("}") + 1
                );
                let inforsObj = JSON.parse(infors);
                let myIp = inforsObj.cip;
                //登录的账户名
                let uname = userdata.username;
                // console.log(inforsObj);
                //当前时间是:
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minutes = date.getMinutes();
                var second = date.getSeconds();
                let currentTime =
                  year +
                  "-" +
                  month +
                  "-" +
                  day +
                  " " +
                  hour +
                  ":" +
                  minutes +
                  ":" +
                  second +
                  "";
                //查询数据库有没有这个id名 检索用户的登陆时间
                searchLogInfors(uname)
                  .then(userlog => {
                    let lastTime = userlog.data[0].thisTime;
                    let lastIP = userlog.data[0].thisIp;
                    let thisTime = userlog.data[0].thisTime;
                    let thisIP = userlog.data[0].thisIp;
                    insertLog(
                      uname,
                      lastIP,
                      lastTime,
                      myIp,
                      currentTime
                    ).then(insert => {});
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });

            // 这里用数组作为一个标识是否记住密码，为什么是数组 因为bootstrap这个框架。。。 实际上是我懒
            //已经映射好token了。  当密码正确的时候才保存账号token 为了挺高用户体验
            //这是账号唯一的token 不要放入istrue判断中
            // localStorage.setItem("user_token", res.data.info.token);
            localStorage.setItem("user_info", JSON.stringify(userdata));
            // console.log(localStorage.getItem("user_info"));
            //更改vuex 的userinfo 的值 实现动态改变
            this.SET_USERINFO(userdata.name);
            //这里本来想着当没记住密码的时候要删除loacalstorage里的某项键值对的 但是目前还没有找到很好的办法 所以是有个bug先放着
            var isTrue = JSON.stringify(this.form.checked[0]);
            localStorage.setItem("ischecked", ischecked.checked);
            getLoginLog().then(res => {
              sessionStorage.setItem(
                "weather",
                JSON.stringify(res.data.weather)
              );
            });
                        //更改vuex 的userinfo 的值 实现动态改变
            // this.SET_USERINFO(userdata.name);
            this.$st
            //登录定时器
            setTimeout(() => {
              this.progressMode = true;
              this.$router.push({
                path: "../../layout/componets/index",
                name: "index",
                replace: true
              });
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   重置代码
    onReset(evt) {
      evt.preventDefault();
      this.form.name = "";
      this.form.password = "";
      this.form.checked = [];
      //重置清除表单验证的技巧
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.errTips = false;
      });
    }
  },
  components: {
    find
    //注册组件
  },
  computed: {
    ...mapState(["userinfo", "weatherState"])
  },
  mounted() {
    // 判断是否记住密码？
    let ischeckedstate = JSON.parse(localStorage.getItem("ischecked"));
    let ischecked = document.getElementsByClassName("custom-control-input")[0];
    let userInfo = localStorage.getItem("user_info");
    if (ischeckedstate == true) {
      ischecked.checked = true;
      this.form.name = this.$store.state.userinfo.username;
      this.form.password = this.$store.state.userinfo.userpass;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
