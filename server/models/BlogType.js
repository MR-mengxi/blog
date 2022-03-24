const mongoose = require("mongoose");
const blogTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    articleCount: {
        type: Number,
        default:0
    },
    order: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("BlogType",blogTypeSchema);