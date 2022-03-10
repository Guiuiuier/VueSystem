<template>
  <div>
    <b-collapse id="collapse-mysystemmange" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="pencil" class="iconstyle"></b-icon>登录日志
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
      this.$router.push("/index/systemmanage/loginLog");
    }
  }
};
</script>