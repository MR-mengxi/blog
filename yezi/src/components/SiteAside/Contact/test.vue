<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
import "@/styles/global.less"; // 因为是快速原型开发，入口文件不是App.vue，所以全局样式没有作用上
export default {
  components: {
    Contact,
  },
};
</script>

<style scoped>
.test-container {
  width: 400px;
  height: 400px;
  /* border: 2px solid orange; */
  background: #000;
  padding-top: 200px;
  margin: 0px auto;
}
</style>