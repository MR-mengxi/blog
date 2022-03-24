const {Setting} = require("../models");
const result = {
    avatar: "/upload/1645931852513-nnnb6g.jpg",
    siteTitle: "也子喜欢筱时",
    github: "https://github.com/MR-mengxi",
    qq: "2515409089",
    qqQrCode: "/upload/1645508867178-7ocxbp.png",
    weixin: "z2515409089",
    weixinQrCode: "/upload/1645509056106-744gws.jpg",
    mail: "zzy12478@gmail.com",
    icp: "冀ICP备2021028915号",
    githubName: "MR-mengxi",
    favicon: "/upload/favicon.ico",
}

async function test(){
    const res = await Setting.create(result);
    console.log(res);
}

test();
