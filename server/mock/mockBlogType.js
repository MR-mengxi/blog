const {BlogType} = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
    "datas": [
        {
            name: "html",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "css",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "js",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "vue",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "react",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "node",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            "name|1": "网络",
            "articleCount|0-20": 0,
            "order|1-3": 1
        },
        {
            name: "其它",
            "articleCount|0-20": 0,
            "order|1-3": 1
        }
    ]
}).datas

async function test(){
    const res = await BlogType.create(result);
    console.log(res);
}

test();