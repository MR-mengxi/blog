const express = require("express");
const router = express.Router();
const ProjectServ = require("../../services/projectServ");
const { asyncHandler } = require("../getSendResult");

// 获取所有项目
router.get("/", asyncHandler(async (req, res) => {
    return await ProjectServ.getProjects();
}))

// 添加项目
router.post("/", asyncHandler(async (req, res) => {
    return await ProjectServ.addProject(req.body);
}))

// 修改项目
router.put("/:id", asyncHandler(async (req, res) => {
    return await ProjectServ.setProject(req.params.id, req.body);
}))

// 删除项目
router.delete("/:id", asyncHandler(async (req, res) => {
    return await ProjectServ.deleteProject(req.params.id);
}))

module.exports = router;