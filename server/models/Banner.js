const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
    midImg: {
        type: String,
        default: ""
    },
    bigImg: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { versionKey: false, strict: true, })

module.exports = mongoose.model("Banner", bannerSchema);