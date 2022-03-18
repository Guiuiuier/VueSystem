<template>
    <div> 
         
    <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
    provide(){
        return {reloads:this.reloads}
    },
    data(){
        return{
         isRouterAlive:true,
        }
    },
    methods: {
        reloads(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true
            })
        }
    },
    mounted() {
    //    console.log(this.$route);  
    },
    component:{
         
    }
}
</script>