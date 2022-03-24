const Setting = require("../models/Setting");

exports.getSetting = async function () {
    const result = await Setting.findOne({}, { __v: 0 });
    return result;
}

exports.setSetting = async function (data) {
    const result = await Setting.findOneAndUpdate({}, { $set: data });
    return result;
}