const express = require("express");
const router = express.Router();
const BannerServ = require("../../services/bannerServ");
const { asyncHandler } = require("../getSendResult");

router.get("/", asyncHandler(async (req, res) => {
    return await BannerServ.getBanners();
}))

router.post("/",asyncHandler(async (req,res)=>{
    return await BannerServ.setBanners(req.body);
}))

module.exports = router;