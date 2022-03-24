const Admin = require("../models/Admin");

// 登录
exports.login = async function (loginId, loginPwd) {
    const result = await Admin.findOne({
        loginId,
        loginPwd
    }, { __v: 0, loginPwd: 0 });
    if (result) {
        return result;
    }
    return null;
}

// 更新用户信息
exports.update = async function (userInfo) {
    const { name, loginId, newLoginPwd, id } = userInfo;
    const newUserInfo = { name, loginId, loginPwd: newLoginPwd };
    const result = await Admin.findByIdAndUpdate(id, { $set: newUserInfo }, { new: true });
    return result;
}

// 我是谁
exports.whoami = async function (id) {
    const result = await Admin.findById(id, { __v: 0 });
    if (result) {
        return result;
    }
    return null;
}