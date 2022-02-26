<template>
    <div>
        <b-button @click='topage' >
            <b-icon icon="person" class="iconstyle"></b-icon>人员管理
          </b-button>
    </div>
</template>
<style lang="less" scoped>
 @import "/public/sider.less";

</style>
<script>
export default {

        methods: {
        topage:function(){
            this.$router.push('/index/personalmain')
        },

    },

}
</script>