const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    loginId: {
        type: String,
        required: true
    },
    loginPwd: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Admin", adminSchema);