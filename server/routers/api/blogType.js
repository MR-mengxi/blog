const express = require("express");
const router = express.Router();
const BlogTypeServ = require("../../services/blogTypeServ");
const {asyncHandler} = require("../getSendResult");

// 获取所有的文章分类
router.get("/",asyncHandler(async (req,res)=>{
    return await BlogTypeServ.getBlogType();
}))

// 获取一个文章分类
router.get("/:id",asyncHandler(async(req,res)=>{
    return await BlogTypeServ.getBlogTypeById(req.params.id);
}))

// 添加一个文章分类
router.post("/",asyncHandler(async(req,res)=>{
    return await BlogTypeServ.addBlogType(req.body);
}))

// 修改一个文章分类
router.put("/:id",asyncHandler(async(req,res)=>{
    return await BlogTypeServ.updateBlogType(req.params.id, req.body);
}))

// 删除一个文章分类
router.delete("/:id",asyncHandler(async(req,res)=>{
    return await BlogTypeServ.deleteBlogType(req.params.id);
}))

module.exports = router;