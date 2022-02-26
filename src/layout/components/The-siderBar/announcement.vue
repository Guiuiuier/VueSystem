<template>
    <div>
        <b-button @click='topage'>
            <b-icon icon="briefcase" class="iconstyle"></b-icon>公司公告
          </b-button> 
    </div>
</template>
<style lang="less" scoped>
 @import "/public/sider.less";

</style>
<script>
export default {
    data(){
        return{
        }
        },

    methods: {
        topage:function(){
            this.$router.push('/index/announcemain')
        },

    },

}
</script>