<template>
  <div>
    <div class="login">
      <b-container fluid>
        <div class="login-container">
          <div class="login-container-title">找回账号/密码</div>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label-for="input-1">
              <b-row style="padding-bottom:20px" v-if="userInput">
                <b-col cols="12">
                  <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="请输入管理员为您录入的ID信息"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row v-if="!userInput" style="padding-top:20px padding-left:20px">
                <b-col cols="8" style="padding-right:15px;padding-left:15px;">
                  <b-form-input
                    v-model="form.code"
                    type="text"
                    required
                    id="input-1"
                    placeholder="请输入验证码"
                  >1</b-form-input>
                </b-col>
                <b-col style="padding-right:15px padding-left:0px">
                  <b-button
                    style="margin:0px ;width:100%"
                    variant="info"
                    @click="countDown"
                    id="sendBtn"
                    v-show="codeBtnShow"
                  >获取验证码</b-button>
                  <b-button
                    style="margin:0px ;width:100%"
                    variant="info"
                    @click="countDown"
                    id="sendBtn"
                    disabled
                    v-show="!codeBtnShow"
                  >{{count}}后重新获取</b-button>
                </b-col>
              </b-row>
            </b-form-group>

            <span class="errorTips" v-if="infoTips">您的账号是{{this.username}}密码是:{{this.userpass}}</span>
            <span class="errorTips" v-if="erroTips">都没这个号，乱输入？</span>
            <b-form-group id="input-group-4" v-if="isAdminShow">
              <div class="register_right" style="float:right">
                <a
                  href="javascript:;"
                  style="text-decoration:none"
                  @click="controoter"
                >这都不知道？点这里联系管理员！</a>
              </div>
              <span class="errorTips" v-show="rooter">管理员的联系方式:{{this.adminContact}}</span>
              <div class="clear" style="clear:both"></div>
            </b-form-group>
            <b-button type="submit" variant="primary" v-if="findBtn">找回</b-button>
            <b-button type="submit" variant="primary" @click="Myuser" v-if="!findBtn">确认</b-button>
            <b-button variant="danger" @click="back" class="backbtn" v-if="preBtn">返回上一页</b-button>
            <b-button variant="danger" @click="pre" class="backbtn" v-if="!preBtn">返回上一页</b-button>
          </b-form>
        </div>
      </b-container>
    </div>
    <router-view></router-view>
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
  margin-bottom: 10px;
}

.backbtn {
  background-color: rgb(1, 199, 1);
  border: rgb(1, 199, 1);
  &:hover {
    background: rgb(1, 199, 1);
  }
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
import { login, administratorContact } from "@/api";
import { loginCode, sendMail, myPass } from "@/api2";
export default {
  data() {
    return {
      isAdminShow:true,
      preBtn: true,
      subBtn: false,
      userInput: true,
      findBtn: true,
      codeBtnShow: true,
      timer: null,
      count: "",
      code: "",
      contact: "",
      form: {
        name: "",
        userpass: "",
        code: ""
      },
      show: true,
      infoTips: false,
      erroTips: false,
      rooter: false,
      //存储的账号和密码
      username: "",
      userpass: "",
      //联系方式
      adminContact: ""
    };
  },
  methods: {
    // 返回上一页
    back: function() {
      this.$router.push("../login");
    },
    pre: function() {
      this.preBtn = true;
      this.userInput = true;
      this.findBtn = true;
      this.isAdminShow=true;
      // this.infoTips = false;
    },
    controoter: function() {
      this.rooter = true;
      administratorContact()
        .then(res => {
          this.adminContact = res.data.number;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交代码
    onSubmit(evt) {
      var event = event || window.event;
      event.preventDefault(); //防止发生默认行为
      loginCode(this.form.name).then(res => {
        if (res.data[0].username == this.form.name) {
                this.isAdminShow=false;

          this.contact = res.data[0].number;
          // console.log(this.contact);
          this.userInput = false;
          this.findBtn = false;
          this.preBtn = false;
        } else {
          this.erroTips = true;
          setTimeout(() => {
            this.erroTips = false;
          }, 2000);
        }
      });
    },
    // sendCode: function() {
    //   // let  sendBtn=document.getElementById("sendBtn");
    //   // sendBtn.disabled="disabled";
    //   // sendMail(this.contact).then(res => {
    //   //   this.code = res.data;
    //   // });
    //   // setTimeout(()=>{
    //   //   sendBtn.innerHTML="验证码已发送"
    //   // },1000)
    //   //       setTimeout(()=>{
    //   //         sendBtn.disabled=false;
    //   //         sendBtn.innerHTML="发送验证码"
    //   //       },1100)
    // },

    Myuser: function() {
      //  alert(JSON.stringify(this.form));
      if (this.form.code != this.code || this.form.code == "") {
        alert("验证码错误");
        // return false;
      } else {
        myPass(this.form.name).then(res => {
          this.username = res.data[0].username;
          this.userpass = res.data[0].userpass;
          console.log(this.username, this.userpass);
          this.infoTips = true;
        });
      }
    },
    countDown() {
      const TIME_COUNT = 60;
      //当点击的一瞬间disabled
      this.codeBtnShow = false;
      //同时伪异步一下
      sendMail(this.contact).then(res => {
        this.code = res.data;
      });
      if (!this.timer) {
        this.count = TIME_COUNT;
        //发送
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.codeBtnShow = true;
            //清除定时器
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      } else {
      }
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
  mounted() {},
  created() {}
};
</script>
