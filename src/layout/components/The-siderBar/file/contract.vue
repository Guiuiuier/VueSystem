<template>
    <div>
    <b-collapse id="collapse-a" class="mt-2 childclass">
                   <b-button class="Childbutton" @click="topage">
              <b-icon icon="file-earmark-text-fill" class="iconstyle"></b-icon>合同模板
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
            this.$router.push('/index/filemain/contract')
        },

    },

}
</script>