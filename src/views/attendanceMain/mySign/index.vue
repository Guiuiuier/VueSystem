<template>
  <div>
    <Navsearch></Navsearch>
    <b-table></b-table>
  </div>
</template>

<script>
import Navsearch from "@/layout/components/navSearch/mysign";
export default {
  data() {
    return {
    }
  },
  components: {
    Navsearch,
  },
  created() {
  },
  mounted() {
     
  },
};
</script>
<style lang="less" scoped>
.list-group-item {
  width: 202px;
}
</style>