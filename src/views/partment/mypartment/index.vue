<template>
    <div>
    <Navsearch></Navsearch>
    <personPagination  v-if="isRouterAlive"></personPagination>
    </div>
</template>
<script>
import Navsearch from "@/layout/components/navSearch/partment";
import personPagination from "@/layout/components/personpagination/partment";

export default {
    provide(){
        return {reload:this.reload}
    },
    data(){
        return{
         isRouterAlive:true,
        }
    },
    components:{
  Navsearch,
  personPagination,
    },
        methods: {
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true
            })
        }
    },
}
</script>