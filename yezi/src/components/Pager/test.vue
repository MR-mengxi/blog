<template>
  <div id="app">
    <Pager
      :current="current"
      :total="total"
      @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Pager from "./index";
export default {
  data() {
    return {
      current: 1,
      total: 302,
    };
  },
  components: {
    Pager,
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>

<style scoped>
</style>