<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogToc :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogComment from "./components/BlogComment.vue";
import BlogToc from "./components/BlogToc.vue";
import fetchData from "@/mixins/fetchData.js";
import { getBlog } from "@/api/blog.js";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      if (!resp) {
        // 文章不存在
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
