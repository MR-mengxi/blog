<template>
  <div class="test-container">
    <div class="item" v-for="t in types" :key="t">
      <Icon :type="t" />
    </div>
  </div>
</template>

<script>
import Icon, { types } from "./";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      types,
    };
  },
};
</script>

<style scoped>
.test-container{
  display: flex;
  justify-content: center;
  width: 580px;
  margin: 30px auto;
  flex-wrap: wrap;
}
.item{
  margin: 1em;
  text-align: center;
}
.icon-container{
  display: block;
}
</style>