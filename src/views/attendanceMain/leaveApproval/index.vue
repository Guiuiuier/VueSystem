<template>
    <div>
        <b-container fluid class="con">
       <b-button @click="pre">返回</b-button>
       
       </b-container>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
    , methods: {
      pre:function(){
          this.$router.back();
      }
  },
    created() {
        // console.log(this.$route);
    },
}
</script>