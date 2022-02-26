<template>
  <div>
    <div class="siderMain">
      <div class="sider">
        <b-button-group vertical>
          <!-- 公告管理 -->
          <announcement>

          </announcement>
          <!-- 人员管理 -->
          <personal></personal>
          <!-- 考勤 -->
          <attendance></attendance>
          <!-- 折叠管理 -->
          <b-button v-b-toggle.collapse-a.collapse-b>
            <!-- 文件管理 -->
            <file></file>
          </b-button>
          <!-- 在职员工合同 -->
          <Emcontract></Emcontract>
          <!-- 员工合同 -->
          <contract></contract>
          
        </b-button-group>
        
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "/public/sider.less";
</style>
<script>
import announcement from "./The-siderBar/announcement";
import attendance from "./The-siderBar/attendance";
import personal from "./The-siderBar/personal";
import file from "./The-siderBar/file";
import contract from "./The-siderBar/contract";
import Emcontract from "./The-siderBar/Emcontract";
export default {
  data() {
    return {};
  },
  components: {
    announcement,
    attendance,
    contract,
    Emcontract,
    file,
    personal
  },
  methods: {}
};
</script>