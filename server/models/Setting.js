const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({
    // Schema的配置
    avatar: {
        type: String,
        required: true
    },
    siteTitle: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    qq: {
        type: String,
        required: true
    },
    qqQrCode: {
        type: String,
        required: true
    },
    weixin: {
        type: String,
        required: true
    },
    weixinQrCode: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    icp: {
        type: String,
        required: true
    },
    githubName: {
        type: String,
        required: true
    },
    favicon: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Setting",settingSchema);