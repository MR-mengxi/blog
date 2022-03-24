const jwt = require("jsonwebtoken");
const secrect = "yezi";
const cookieKey = "token";

// 颁发jwt
exports.publish = (res, maxAge = 24 * 3600, info = {}) => {
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge
    });
    // 添加到cookie
    // res.cookie(cookieKey, token, {
    //     path: "/",
    //     maxAge: maxAge * 1000 // 毫秒
    // });
    // 添加到authorization，其它传输
    res.header("authorization", token);
}


exports.verify = (req) => {
    let token = req.headers.authorization;
    if (!token) {
        // 没有token
        return null;
    }
    // authorization：bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];

    try {
        const result = jwt.verify(token, secrect);
        return result;
    } catch {
        return null;
    }
}