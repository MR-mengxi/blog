const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "BlogType"
    },
    scanNumber: {
        type: Number,
        default:0
    },
    commentNumber: {
        type: Number,
        default:0
    },
    description: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    toc: {
        type: [Object],
        default: [],
    },
    htmlContent: {
        type: String,
        required: true
    },
    thumb: {
        type: String,
        default: ""
    }
}, {
    versionKey: false,
    strict: true
})

module.exports = mongoose.model("Blog", blogSchema);