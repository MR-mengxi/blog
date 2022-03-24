const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
},{
    versionKey: false,
    strict: true,
})

module.exports = mongoose.model("Message", messageSchema);