<template >
  <div>
    <b-collapse id="collapse-myattend" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="file-earmark-text" class="iconstyle"></b-icon>我的考勤
      </b-button>
    </b-collapse>
  </div>
</template>
<style lang="less" scoped>
@import "/public/sider.less";
</style>
<script>
export default {
  methods: {
    topage: function() {
      this.$router.push("/index/attendancemain/myattendance");
    }
  }
};
</script>