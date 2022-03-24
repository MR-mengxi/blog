const { Project } = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
    "datas|10": [
        {
            name: "@ctitle(1,5)",
            "url|1": ["@url", null],
            "github|1": ["@url", null],
            "description|1-4": ["@ctitle(1, 4)"],
            "thumb|1": [
                "/upload/1646272462571-arw2dq.jpg",
                "/upload/1646272565599-5j0z0p.jpg",
                "/upload/1646272588196-svbczm.jpg",
                "/upload/1646272619903-a38wtd.jpg",
            ],
            order:1
        }
    ]
}).datas;

async function test(){
    const res = await Project.create(result);
    console.log(res);
}

test();
