<template>
  <div>
    <b-collapse id="collapse-partment" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="emoji-neutral" class="iconstyle"></b-icon>我的部门管理
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
      this.$router.push("/index/partment/mypartment");
    }
  }
};
</script>