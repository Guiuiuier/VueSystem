<template>
  <div  @click="btnShow">
    <b-icon icon="files" class="iconstyle"></b-icon>考勤管理
    <b-icon icon="chevron-up" class="Childiconstyle" v-show="btnshow"></b-icon>
    <b-icon icon="chevron-down" class="Childiconstyle" v-show="btnshowdown"></b-icon>
  </div>
</template>
<style lang="less" scoped>
@import "/public/sider.less";
</style>
<script>
export default {
  data() {
    return {
      btnshow:false,
      btnshowdown: true
    };
  },
  methods: {
    btnShow: function() {
      if (this.btnshowdown) {
      this.$router.push('/index/attendancemain/')
        this.btnshowdown = false;
        this.btnshow = true;
      } else {
        this.btnshowdown = true;
        this.btnshow = false;
      }
    }
  }
};
</script>