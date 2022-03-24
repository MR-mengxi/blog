const express = require("express");
const router = express.Router();
const MessageServ = require("../../services/messageServ");
const { asyncHandler } = require("../getSendResult");

// 分页获取留言板内容
router.get("/", asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const blogId = null;
    return await MessageServ.getMessages(page, limit,blogId);
}))

// 添加一条留言
router.post("/", asyncHandler(async (req, res) => {
    return await MessageServ.addMessage(req.body);
}))

// 删除一条留言
router.delete("/:id",asyncHandler(async (req,res)=>{
   return await MessageServ.deleteMessage(req.params.id);
}))

module.exports = router;