<template>
  <div>
    <b-container fluid class="typography">
      <b-form @submit="onSubmit">
        <div class="content-button">
          <b-button @click="pre" class="contentbtn">返回</b-button>
          <b-button type="submit" variant="success" class="contentbtn">发布内容</b-button>
        </div>
        <b-form-group label="标题:" class="mb-0">
          <b-form-input id="input-1" placeholder="输入文章的标题" required v-model="form.topic"></b-form-input>
        </b-form-group>

        <b-form-group label="To:" class="mb-0">
          <b-form-input id="input-1" placeholder="输入接收人" required v-model="form.toPerson"></b-form-input>
        </b-form-group>

        <b-form-group label="署名:" class="mb-0">
          <b-form-input id="input-1" placeholder="输入署名" required v-model="form.endName"></b-form-input>
        </b-form-group>

        <b-form-group label="正文:" label-for="input-formatter" class="mb-0">
          <b-form-textarea
            id="input-1"
            v-model="form.content"
            required
            placeholder="输入内容"
            rows="22"
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { announceNew } from "@/api2";
export default {
  inject:['reloads'],
  data() {
    return {
      form: {
        endName: "",
        toPerson: "",
        topic: "",
        content: "",
        user: "",
      },
      boxOne: "",
    };
  },
  methods: {
    pre: function() {
      this.$router.back();
      this.reloads();
    },
    sub: function() {},
    onSubmit(event) {
      event.preventDefault();
      //   alert(JSON.stringify(this.form));
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认发布吗？")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          let flag = String(this.boxOne);
          if (flag === "true") {
            let local = localStorage.getItem("user_info");
            this.form.user = JSON.parse(local).name;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            let currentTimes = year + "-" + month + "-" + day;
            // console.log(currentTimes);
           let user = this.form.user;
            let topic = this.form.topic;
            let endName = this.form.endName;
            let toPerson = this.form.toPerson;
            let content = this.form.content;
            announceNew(
              user,
              topic,
              endName,
              toPerson,
              content,
              currentTimes
            ).then(res => {
            //   console.log(res);
             this.$bvModal.msgBoxConfirm("发布成功");
            });
            this.reloads();
          }
        })
        .catch(err => {});
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.content-button {
  padding-bottom: 10px;
  .contentbtn {
    margin: 0 5px;
  }
}
</style>