const express = require("express");
const app = express();

// 使用history模式，切换路由的时候才可以匹配到路由
const history = require("connect-history-api-fallback");
app.use(history());


const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

// 用于解析token的中间件
app.use(require("./tokenMiddleware"));

// // 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());

app.use("/api/admin",require("./api/admin"));
app.use("/api/banner",require("./api/banner"));
app.use("/api/blog", require("./api/blog"));
app.use("/api/comment",require("./api/comment"));
app.use("/api/blogtype",require("./api/blogType"));
app.use("/api/message",require("./api/message"));
app.use("/api/project",require("./api/project"));
app.use("/api/setting", require("./api/setting"));
app.use("/api/upload",require("./api/upload"));

// 处理错误的中间件
app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
    console.log(`server listen on ${port}`);
})