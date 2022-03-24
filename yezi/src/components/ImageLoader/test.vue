<template>
  <div class="test-container">
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      :duration="1000"
      @load="handleLoaded"
    />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    handleLoaded() {
      console.log("ImageLoader组件load事件触发图片，加载完成");
    },
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 500px;
  height: 400px;
  border: 1px solid;
  margin: 0 auto;
}
</style>