<template>
  <div>
    <Navsearch v-if="isRouterAlive"></Navsearch>
    <b-table></b-table>
  </div>
</template>

<script>
import Navsearch from "@/layout/components/navSearch/mysign";
export default {
      provide(){
        return {reloads:this.reload}
    },
  data() {
   return{
         isRouterAlive:true,
        }
  },
  components: {
    Navsearch,
  },
  created() {
  },
  mounted() {
     
  },
      methods: {
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true
            })
        }
    },
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>