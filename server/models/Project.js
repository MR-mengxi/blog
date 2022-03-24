const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ""
    },
    github: {
        type: String,
        default: ""
    },
    description: {
        type: [String],
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required:true
    }
}, {
    versionKey: false,
    strict: true,
})

module.exports = mongoose.model("Project", projectSchema);