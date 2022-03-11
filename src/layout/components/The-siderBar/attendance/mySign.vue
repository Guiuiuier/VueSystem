<template>
  <div>
    <b-collapse id="collapse-myattend" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="emoji-laughing-fill" class="iconstyle"></b-icon>前往签到
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
      this.$router.push("/index/attendancemain/mysign");
    }
  }
};
</script>