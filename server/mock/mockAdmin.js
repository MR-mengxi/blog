const { Admin } = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
    "datas|1": [
        { loginId: "admin", loginPwd: 123123,name:"超级管理员" }
    ]
}).datas;
async function test(){
    const res = await Admin.create(result);
    console.log(res);
}

test();