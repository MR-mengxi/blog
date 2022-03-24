const express = require("express");
const router = express.Router();
const SettingServ = require("../../services/settingServ");
const { asyncHandler } = require("../getSendResult");

router.get("/", asyncHandler(async (req, res) => {
    return await SettingServ.getSetting();
}))

router.put("/", asyncHandler(async (req, res) => {
    return await SettingServ.setSetting(req.body);
}))

module.exports = router;