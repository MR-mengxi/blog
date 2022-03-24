const express = require("express");
const router = express.Router();
const AdminServ = require("../../services/adminServ");
const { asyncHandler } = require("../getSendResult");
const jwt = require("../jwt");

router.post("/login", asyncHandler(async (req, res) => {
    const result = await AdminServ.login(req.body.loginId, req.body.loginPwd);
    if (result) {
        let value = result._id;
        jwt.publish(res, undefined, { id: value });
    }
    return result;
}))

router.put("/",asyncHandler(async(req,res)=>{
    return await AdminServ.update(req.body);
}))

router.get("/whoami", asyncHandler(async (req, res) => {
    return await AdminServ.whoami(req.userId);
}))

module.exports = router;