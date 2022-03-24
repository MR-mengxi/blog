<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope"> {{ scope.$index + (currentPage-1) * eachPage + 1 }}</template>
      </el-table-column>
      <el-table-column label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px;"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a href="#" target="_blank" @click.prevent="goToTitleHandle(scope.row)" slot="reference">
              {{scope.row.title}}
            </a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" width="150" align="center">
        <template slot-scope="scope"> {{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="浏览数" width="60" align="center">
        <template slot-scope="scope"> {{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column label="评论量" width="60" align="center">
        <template slot-scope="scope"> {{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column label="所属分类" width="150" align="center">
        <template slot-scope="scope"> {{ scope.row.categoryId === null ?"未分类":scope.row.categoryId.name }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createDate, true) }}</template
        >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
               <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlog(scope.row)"></el-button>
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
       :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
import { CLIENT_URL } from "@/utils/urlConfig";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5,
      currentPage: 1,
      totalPage: 0,
      count: 0,
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data } = await findBlog(this.currentPage, this.eachPage);
      this.data = data.rows;
      for (const i of this.data) {
        this.srcList.push(i.thumb);
      }
      this.count = data.total;
      this.totalPage = Math.ceil(this.count / this.eachPage);
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.fetchData();
      }
    },
    formatDate,
    goToTitleHandle(blogInfo) {
      console.log(blogInfo);
      window.open(`${CLIENT_URL}/article/${blogInfo.id}`);
    },
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除, 是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delOneBlog(blogInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBlogHandle(blogInfo){
      this.$router.push(`/editBlog/${blogInfo.id}`)
    },
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>

<style>
</style>
