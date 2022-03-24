const {Banner} = require("../models");
const Mock = require("mockjs");

const result = Mock.mock({
   datas:[
    {
        midImg: "/upload/1645422894114-nzi1nn.jpg",
        bigImg: "/upload/1645422998204-5ge6nt.jpg",
        title: "凛冬将至",
        description: "人唯有恐惧的时候方能勇敢",
      },
      {
        midImg: "/upload/1645423293228-254hkj.jpg",
        bigImg: "/upload/1645423325005-gpn8yu.jpg",
        title: "血火同源",
        description: "如果我回头，一切都完了",
      },
      {
        midImg: "/upload/1645423373296-e2wn6w.jpg",
        bigImg: "/upload/1645423395547-t2i8ae.jpg",
        title: "听我怒吼",
        description: "兰尼斯特有债必偿",
      },
   ]
}).datas;

async function test(){
  const res = await Banner.create(result);
  console.log(res);
}

test();