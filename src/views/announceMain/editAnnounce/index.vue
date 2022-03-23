<template>
  <div>
    <b-container fluid class="typography">
      <b-form @submit="onSubmit" >
        <div class="content-button">
          <b-button @click="pre" class="contentbtn">返回</b-button>
          <b-button type="submit" variant="success" class="contentbtn">修改内容</b-button>
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
import { announceId, announceEdit } from "@/api2";
export default {
  inject:['reloads'],
  data() {
    return {
      contents: "",
      form: {
        endName: "",
        toPerson: "",
        topic: "",
        content: ""
      },
      boxOne: ""
    };
  },
  methods: {
    pre: function() {
      this.$router.back();
      // this.reloads();
    },
    onSubmit(event) {
      event.preventDefault();
      //   alert(JSON.stringify(this.form));
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("确认修改吗？")
        //判断是不是确定删除
        .then(value => {
          this.boxOne = value;

          let flag = String(this.boxOne);
          if (flag === "true") {
            announceEdit(
              this.contents.id,
              this.form.topic,
              this.form.endName,
              this.form.toPerson,
              this.form.content
            ).then(res => {
              this.$bvModal.msgBoxConfirm("修改成功");
            });
          this.reloads();
         }
        })
        .catch(err => {});
    }
  },
    beforeRouteLeave(to, from, next) {
    if (to.name === "login") {
      next();
    } else {
      if (from.name === "editannounce") {
        this.boxOne = "";
        this.$bvModal
          .msgBoxConfirm("确认要离开当前页面吗？离开不会保存任何信息！")
          .then(value => {
            this.boxOne = value;
            let flag = String(this.boxOne);
            if (flag === "true") {
              next();
            }
          });
      }
    }
  },
  created() {
    announceId(this.$route.params.id)
      .then(res => {
        this.contents = res.data[0];
        this.form.content = this.contents.content;
        this.form.endName = this.contents.endName;
        this.form.topic = this.contents.topic;
        this.form.toPerson = this.contents.toPerson;
      })
      .catch({});
  }
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