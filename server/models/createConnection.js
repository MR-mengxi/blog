const mongoose = require("mongoose");
// mongoose.set("useCreateIndex",true);
mongoose.connect("mongodb://localhost/mysite",{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
})

mongoose.connection.on("open",()=>{
    console.log("连接已打开");
})