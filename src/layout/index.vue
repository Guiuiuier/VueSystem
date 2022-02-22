<template>
    <div>
        欢迎登录{{userinfo.name}}
         <span @click="quit">退出</span>
         <span @click="quit2">登录</span>
    </div>
</template>
<script>
import {getLoginLog,login} from '@/api'
import {mapState} from 'vuex'
export default {
    components:{

    },
    computed:{
        ...mapState(['userinfo']), //映射 刷新后又会变成空对象 是因为在vuex中刷新会重新定义为store/index.js中的空对象 所以要在本地存一个对象
        },
    mounted() {
        
        //  login.then(res=>{
            //      let local=res.token;
              
        //  }) 
        getLoginLog().then(res=>{
            // let local=localStorage.setItem("user_name");
            // console.log(local);
            // console.log(res.data);
        })
    },
    methods: {
quit2:function(){
     console.log(this.$store.userinfo);
},
        quit:function(){
            //退出登入 要清楚token和userinfo 
            //跳转到登录页
            
            localStorage.removeItem("user_info");
            localStorage.removeItem("user_token");
             //退出登录
            this.$router.push("/login/index");
        }
    },
}
</script>