<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" width="150" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.avatar"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.blogId.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center" width="230">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate, true)
        }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteComment(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="margin-top: 30px"
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next, total, ->,sizes, jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @prev-click="prevClickHandle"
        @next-click="nextClickHandle"
        @current-change="currentChangeHandle"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getComment, delComment } from "@/api/comment";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      currentPage: 1,
      eachPage: 5,
      totalPage: 0,
      count: 0,
      data: [],
      pagerCurrentPage: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    formatDate,
    deleteComment(id) {
      this.$confirm("是否删除此条评论信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delComment(id).then((res) => {
            console.log(res);
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
    currentChangeHandle(pageNum) {
      this.currentPage = ~~pageNum;
      this.fetchData();
    },
    handleSizeChange(pagerNum) {
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.eachPage = ~~pagerNum;
      this.fetchData();
    },
  },
};
</script>

