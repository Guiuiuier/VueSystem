<template >
  <div>
    <b-collapse id="collapse-b" class="mt-2 childclass">
      <b-button class="Childbutton" @click="topage">
        <b-icon icon="file-earmark-text" class="iconstyle"></b-icon>在职员工合同
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
        topage:function(){
            this.$router.push('/index/filemain/emcontract')
        },

    },

}
</script>