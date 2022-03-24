const express = require("express");
const router = express.Router();
const blogServ = require("../../services/blogServ");
const { asyncHandler } = require("../getSendResult");

// 分页获取文章
router.get("/", asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const categoryId = req.query.categoryid;
    return await blogServ.getBlogs(page, limit, categoryId);
}))

// 获取单篇文章
router.get("/:id", asyncHandler(async (req, res) => {
    return await blogServ.getBlogById(req.params.id);
}))

// 添加文章
router.post("/", asyncHandler(async (req, res) => {
    return await blogServ.addBlog(req.body);
}))

// 修改文章
router.put("/:id", asyncHandler(async (req, res) => {
    return await blogServ.setBlog(req.params.id, req.body);
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    return await blogServ.deleteBlog(req.params.id);
}))


module.exports = router;