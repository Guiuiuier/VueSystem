<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <span class="errorTips" style="color:red; font-size:14px" v-show="errTips" >两次输入密码错误！请再次输入</span>

      <b-form-group
        id="input-group-1"
        label="欢迎您"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          disabled
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="请输入要修改的密码:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.userpass"
          placeholder="输入密码"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="请再次输入密码:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.userpassAgain"
          placeholder="再次输入密码"
          type="password"
          required
        ></b-form-input>
      </b-form-group>



      <b-button type="submit" variant="primary">确定</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>
  </div>
</template>

<script>
import {updatePass} from '@/api2';
  export default {
    data() {
        
      return {
        boxOne:"",
          errTips:false,
          form: {
          username:'',
          userpass: '',
          userpassAgain:'',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        //如果不对 报错并再次输入
        if(this.form.userpass!=this.form.userpassAgain){
             setTimeout(() => {
              this.errTips = true; //错误提示框
              setTimeout(() => {
                this.errTips = false; //错误提示框
              }, 3000);
            }, 1000);
            //  alert('两次密码不对请再次输入');
             return false;
        }else{
  this.boxOne = "";
      this.$bvModal.msgBoxConfirm("确认修改吗？").then(value => {
        this.boxOne = value;
        // console.log(typeof this.boxOne);
        let flag = String(this.boxOne);
        if (flag === "true") {
            let local=localStorage.getItem('user_info');
            let token=JSON.parse(local).token;
            updatePass(this.form.username,this.form.userpass,token).then(res=>{
                // console.log(res);
            })
            setTimeout(()=>{
              alert("修改成功 请重新登录");
              
                  localStorage.clear();
                  sessionStorage.clear();
                  this.$router.replace("@/views/login/index");

            },1000)

                //修改密码

        }
      
        })
        }
      },
      onReset(event) {
        event.preventDefault()
        this.form.userpass = ''
        this.form.userpassAgain =''
        this.show = false
        this.$nextTick(() => {
          this.show = true
          this.errTips=false;
        })
      }
    },
    mounted() {
         let local=localStorage.getItem("user_info");
        this.form.username=JSON.parse(local).username;
    },
  }
</script>