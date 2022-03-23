<template>
    <div @click="btnShow(this)" >
    <b-icon icon="flower1" class="iconstyle"></b-icon>部门管理
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