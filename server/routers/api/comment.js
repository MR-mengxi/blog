const express = require("express");
const router = express.Router();
const commentServ = require("../../services/messageServ");
const { asyncHandler } = require("../getSendResult");

// 分页获取博客评论
router.get("/", asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    let blogId = req.query.blogid;
    if (blogId === -1 || !blogId) {
        blogId = { $ne: null, $exists: true };
    }
    return await commentServ.getMessages(page, limit, blogId);
}))

// 添加评论
router.post("/", asyncHandler(async (req, res) => {
    return await commentServ.addMessage(req.body);
}))

// 删除评论
router.delete("/:id",asyncHandler(async (req,res)=>{
    return await commentServ.deleteMessage(req.params.id);
}))

module.exports = router;