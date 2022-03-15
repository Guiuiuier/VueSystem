<template>
  <div>
    <b-collapse id="collapse-mysystemmange" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="file-earmark-text-fill" class="iconstyle"></b-icon>用户登录
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
      this.$router.push("/index/systemmanage/Users");
    }
  }
};
</script>