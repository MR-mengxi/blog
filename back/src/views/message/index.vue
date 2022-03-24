<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
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
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createDate, true) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteMessageHandle(scope.row)"
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
import { getMessage, delMessage } from "@/api/message";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      data: [],
      currentPage: 1,
      eachPage: 5,
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
      const { data } = await getMessage(this.currentPage, this.eachPage);
      this.data = data.rows;
      this.count = data.total;
      this.totalPage = Math.ceil(this.count / this.eachPage);
      if (this.currentPage > this.totalPage) {
        this.currentPage = this.totalPage;
        this.fetchData();
      }
    },
    formatDate,
    deleteMessageHandle({ id }) {
      this.$confirm("是否删除此条留言信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delMessage(id).then((res) => {
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

<style>
</style>
