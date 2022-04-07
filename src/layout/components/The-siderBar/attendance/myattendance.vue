<template >
  <div>
    <b-collapse id="collapse-myattend" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="emoji-wink" class="iconstyle"></b-icon>我的考勤
      </b-button>
    </b-collapse>
  </div>
</template>
<style lang="less" scoped>
@import "/public/sider.less";
</style>
<script>
export default {
  data(){
    return{
        
    }
  },
  methods: {
    topage: function() {
      this.$router.push("/index/attendancemain/myattendance");
    }
  }
};
</script>