<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light" class="backcolor">
      <b-breadcrumb>
        当前位置:
        <b-breadcrumb-item
          :href="`#`+breadCrumbItem.path"
          v-for="breadCrumbItem in breadCrumbList"
          :key="breadCrumbItem.path"
        >{{breadCrumbItem.meta.title}}</b-breadcrumb-item>
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
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar src="../../public/img/head.jpg"></b-avatar>
              <em class="userName">{{userinfo.name}}</em>
            </template>
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
import { mapState } from "vuex";
export default {
  props: {
    //  天气组件
    weathers: Object
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    // 退出
    quit: function() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("../../login/index");
    }
  },
  created() {},
  computed: {
    ...mapState(["userinfo"]),
    // 是个对象哦
    breadCrumbList() {
      return this.$route.matched;
    }
  },
  mounted() {}
};
</script>