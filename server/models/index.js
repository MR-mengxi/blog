const mongoose = require("mongoose");
require("./createConnection");

exports.Admin = require("./Admin");
exports.Blog = require("./Blog");
exports.Banner = require("./Banner");
exports.BlogType = require("./BlogType");
exports.Message = require("./Message");
exports.Project = require("./Project");
exports.Setting = require("./Setting");

const toJSON = mongoose.Document.prototype.toJSON;
mongoose.Document.prototype.toJSON = function(...args){
    const obj = toJSON.call(this,...args);
    if(obj._id){
        obj.id = obj._id;
        delete obj._id;
    }
    return obj;
}