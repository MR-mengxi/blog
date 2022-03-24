<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
import "@/styles/global.less";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped>
.test-container {
  width: 400px;
  height: 600px;
  background: #000;
  margin: 0 auto;
}
</style>