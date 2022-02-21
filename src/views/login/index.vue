<template>
  <div>
    
    <div class="login">
       <!-- 进度条 -->
      <div class="progress" style="height:5px;" v-if="progressMode">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 95%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
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
              <b-form-checkbox value="me">记住密码</b-form-checkbox>
            </b-form-checkbox-group>

             <div class="register_right" style="float:right">
                     <router-link to="../find/index" style="text-decoration:none">忘记密码了?点击这里！</router-link>
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
import { login} from '@/api'
//映射
import {mapMutations} from "vuex";
import find from '../find/index'
export default {
  data() {
    return {
     progressMode:false,//进度条
      form: {
        name: "",
        password: "",
        // checked: []
      },
      show: true,
      errTips: false
    };
  },
  methods: {

     //映射
     ...mapMutations(['SET_USERINFO']),
    // 登录代码
    //  收集用户输入的username和password传递给后端
    //登录通过后将返回的token存到本地
    //每次请求的时候 携带token到请求头
    //展示token校验成功的数据
    //校验不通过，跳转到登录页

    onSubmit(evt) {
      let username=this.form.name;
      let password=this.form.password;
        this.progressMode=true;   //加载条
      //  调用api 发送请求
       login(username,password).then(res=>{
         if((password!=res.data.userinfo.userpass)||(username!=res.data.userinfo.username)){
         setTimeout(()=>{
           this.progressMode=false;
           this.errTips = true; //错误提示框
          setTimeout(() => {
            this.errTips = false; //错误提示框 
          }, 2000);
          },1000)
        }else{
          //  返回一个token值 这是后端的token返回到前端并添加到本地
           setTimeout(()=>{
             this.progressMode=true;
             localStorage.setItem('user_token',res.data.token);
             localStorage.setItem('user_info',JSON.stringify(res.data.userinfo)); //此时返回的是对象 要转换为json格式
             //更改vuex 的userinfo 的值 
              this.SET_USERINFO(res.data.userinfo);
              // console.log(res);
               this.$router.push({
             path:'../../layout/componets/index',
              name:'index',
            })
           },1000);
           
        }
       }).catch(err=>{
         console.log(err);
       })
      
       
// this.$refs[evt].validate((valid)=>{
        //   if(valid){  //本地校验通过
        //  console.log(this.form.name,this.form.password)
        //   }
        // })

      // evt.preventDefault(); //防止发生默认行为
      // if (this.form.name != "admin" || this.form.password != "admin") {
      //   this.errTips = true;
      //   setTimeout(() => {
      //     this.errTips = false;
      //   }, 2000);
      // }else{
      //       this.$router.push({
      //         path:'../../layout/componets/index',
      //         name:'index',
      //       })
      // }
      // alert(JSON.stringify(this.form));
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
    components:{
    find,
    //注册组件
  } 
};

</script>
