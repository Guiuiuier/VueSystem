<template>
  <div>
    <div class="login">
      <div class="login-container">
        <div class="login-container-title">找回账号/密码</div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
              placeholder="请输入管理员为您录入的ID信息"
            ></b-form-input>
          </b-form-group>
          <span class="errorTips" v-if="infoTips">您的账号是{{this.username}}密码是:{{this.userpass}}</span>
          <span class="errorTips" v-if="erroTips">都没这个号，乱输入？</span>
          <b-form-group id="input-group-4">
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
          <b-button type="submit" variant="primary">找回</b-button>
          <b-button variant="danger" @click="back" class="backbtn">返回上一页</b-button>
        </b-form>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
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
import { login,administratorContact} from "@/api";
export default {
  data() {
    return {
      form: {
        name: "",
        userpass: ""
      },
      show: true,
      infoTips: false,
      erroTips: false,
      rooter: false,
      //存储的账号和密码
      username: "",
      userpass: "",
       //联系方式
      adminContact:"",
    };
  },
  methods: {
    // 返回上一页
    back: function() {
      this.$router.push("../login/index");
    },
    controoter: function() {
      this.rooter = true;
        administratorContact().then(res=>{
           this.adminContact=res.data.number;
        })
       .catch(err => {
          console.log(err);
        });
    },
    // 提交代码
    onSubmit(evt) {
      var event = event || window.event;
      event.preventDefault(); //防止发生默认行为
      login().then(res => {
        if (this.form.name == res.data.userinfo.username) {
          this.infoTips = true;
          this.erroTips = false;
          this.username = res.data.userinfo.username;
          this.userpass = res.data.userinfo.userpass;
        } else {
          this.erroTips = true;
          this.infoTips = false;
        }
      })   .catch(err => {
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
  }
};
</script>
