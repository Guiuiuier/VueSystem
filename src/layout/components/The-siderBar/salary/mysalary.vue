<template>
  <div>
    <b-collapse id="collapse-mysalary" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="cart-plus" class="iconstyle"></b-icon>我的薪资
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