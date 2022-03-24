const BlogType = require("../models/BlogType");
const Blog = require("../models/Blog");

// 获取文章分类
exports.getBlogType = async function () {
    const result = await BlogType.find({}, { __v: 0 }).sort({ order: -1 });
    return result;
}

// 根据id获取文章分类
exports.getBlogTypeById = async function (id) {
    const result = await BlogType.findById(id, { __v: 0 });
    return result;
}

// 添加文章分类
exports.addBlogType = async function (data) {
    const result = await BlogType.create({ ...data, articleCount: 0 });
    return result;
}

// 更新文章分类
exports.updateBlogType = async function (id, blogTypeInfo) {
    const result = await BlogType.findByIdAndUpdate(id, { $set: blogTypeInfo }, { new: true });
    return result;
}

// 删除文章分类
exports.deleteBlogType = async function (id) {
    const blogType = await BlogType.findById(id);
    await Blog.updateMany({
        categoryId: blogType._id,
    }, {
        $set: { categoryId: null }
    })
    const result = await BlogType.deleteOne({ _id: id });
    return null;
}
