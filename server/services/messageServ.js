const Message = require("../models/Message");
const Blog = require("../models/Blog");
const { defaultAvatar, getRandom } = require("../utils/defaultAvatar")

// 分页获取评论
exports.getMessages = async function (page = 1, limit = 10, blogId) {
    const total = await Message.find({ blogId }).countDocuments();
    const result = await Message.find({ blogId })
        .skip((page - 1) * limit).limit(+limit).sort({ createDate: -1 })
        .populate("blogId", ["_id", "title"]);
    return {
        total: total,
        rows: result
    };
}

// 添加评论
exports.addMessage = async function (messageInfo) {
    const avatarPath = defaultAvatar();
    const avatar = avatarPath[getRandom(0, avatarPath.length)];
    const result = await Message.create({ blogId: null, ...messageInfo, avatar });
    await Blog.updateOne({ _id: result.blogId }, { $inc: { commentNumber: 1 } });
    return result;
}

// 删除评论
exports.deleteMessage = async function (id) {
    const pager = await Message.findById(id);
    if (!pager) {
        return null;
    }
    if (pager.blogId) {
        await Blog.updateOne({ _id: pager.blogId }, { $inc: { commentNumber: -1 } });
    }
    await Message.deleteOne({ _id: id });
    return null;
}