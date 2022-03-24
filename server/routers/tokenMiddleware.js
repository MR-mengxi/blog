const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp")
const jwt = require("./jwt");

// 需要token验证的api接口
const needToTokenApi = [
    { method: "POST", path: '/api/blog' },
    // { method: "POST", path: "/api/comment" },
    { method: "GET", path: "/api/admin/whoami" }
]
// 用于解析token
module.exports = (req, res, next) => {
    const apis = needToTokenApi.filter(api => {
        const reg = pathToRegexp(api.path);
        return api.method === req.method && reg.test(req.path);
    })
    if (apis.length === 0) {
        next();
        return;
    }
    const result = jwt.verify(req);
    if (result) {
        req.userId = result.id;
        next();
    } else {
        handleNonTokan(req, res, next);
    }
}

// 处理没有认证的情况
function handleNonTokan(req, res, next) {
    res.status(403).send(getErr("you dont have any token to access the api"), 403);
}