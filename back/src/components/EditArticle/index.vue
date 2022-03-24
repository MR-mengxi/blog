<template>
  <div>
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>
    <Upload uploadTitle="文章头图" v-model="form.thumb" />
    <div class="block">选择文章分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
      @change="change"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addArticleHandle"
        >{{ mode === "add" ? "发布文章" : "确认修改" }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType";
import { addBlog, editBlog, findOneBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogType: [],
      editorOptions: {
        language: "zh-CN",
      },
    };
  },
  async created() {
    const { data } = await getBlogType();
    this.blogType = data;
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      const result = await findOneBlog(this.id);
      this.form = result.data;
      this.form.select =
        result.data.categoryId === null ? "" : result.data.categoryId.id;
      this.$refs.toastuiEditor.invoke("setHTML", result.data.htmlContent);
    }
  },
  components: {
    Editor,
    Upload,
  },
  methods: {
    addArticleHandle() {
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      const markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };

      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "add") {
          addBlog(obj).then((res) => {
            this.$router.push("/blogList");
          });
        } else {
          editBlog(this.form.id, obj).then((res) => {
            this.$router.push("/blogList");
            this.$message.success("文章修改成功");
          });
        }
      } else {
        this.$message.error("请填写所有内容");
      }
    },
    change() {
      this.$forceUpdate();
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
