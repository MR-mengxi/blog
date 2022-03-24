<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      placeholder="请输入内容"
      :disabled="isDisabled"
    ></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="clickHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, editAbout } from "@/api/about";
export default {
  data() {
    return {
      url: "",
      isDisabled: true,
      btnContent: "编辑",
    };
  },
  created() {
    // this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data;
      });
    },
    clickHandle() {
      if (this.btnContent === "编辑") {
        this.btnContent = "完成";
        this.isDisabled = !this.isDisabled;
      } else {
        if (this.url) {
          this.btnContent = "编辑";
          this.isDisabled = !this.isDisabled;
          editAbout({ url: this.url });
          this.$message({
            message: "更改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "输入框不能为空",
            type: "warning",
          });
        }
      }
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
