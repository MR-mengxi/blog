const {Message} = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
    "datas|20":[
        {
            nickname:"@cname",
            content:"@cparagraph(1,5)",
            "blogId|1":["62206e45c20291566c9d27fb","62206e45c20291566c9d27e8",null],
            "avatar|1": [
                "/upload/1646364153803-8x9k0v.jpg",
                "/upload/1646364185524-jhjpqp.jpg",
                "/upload/1646364205834-szku6o.jpg",
                "/upload/1646364246391-ob6yzi.jpg",
                "/upload/1646364279670-uhyojp.jpg"
            ]
        }
    ]
}).datas;

async function test(){
    const res = await Message.create(result);
    console.log(res);
}

test();