<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-breadcrumb>
        <b-breadcrumb-item href="#home">
          <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>当前位置:Home
        </b-breadcrumb-item>
        <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
        <b-breadcrumb-item active>Baz</b-breadcrumb-item>
      </b-breadcrumb>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>



      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <ul class="list-group list-group-horizontal-sm">
            <li class="list-group-item">{{weathers.date}}</li>
            <li class="list-group-item">{{weathers.city}}</li>
            <li class="list-group-item">{{weathers.temperature}}℃</li>
            <li class="list-group-item">{{weathers.wea}}</li>
          </ul>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar src="../../public/img/head.jpg"></b-avatar>
              <em class="userName">{{userinfo.name}}</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-item @click="quit">退出登录</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style scoped lang="less">
@import "/public/nav.less";
</style>
<script>
// 天气的api
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  props:{
    //  天气组件
    weathers:Object
      },
  data() {
    return {
    };
  },
  components: {},
  methods: {
    quit: function() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.replace("../../login/index");
    }
  },
  created() {

  },
  computed: {
    ...mapState(["userinfo","weatherState"]),
  }
};
</script>