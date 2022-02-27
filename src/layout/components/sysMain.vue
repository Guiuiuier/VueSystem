<template>
    <div>
        <!-- <sdd></sdd> -->
        <div v-if="this.$route.meta.title=='主页'">欢迎您{{infoName.name}}</div>
    <router-view></router-view>
    </div>
</template>

<style scoped lang="less">
</style>

<script>
export default {
    props:{
        infoName:Object,
    },
    data(){
        return {

        }
    },
}
</script>