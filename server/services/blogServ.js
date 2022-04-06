const Blog = require("../models/Blog");
const BlogType = require("../models/BlogType");
const Message = require("../models/Message");
const toc = require("markdown-toc");

// 分页获取文章
exports.getBlogs = async function (page = 1, limit = 10, categoryid = -1) {
    let filter = {};
    if (categoryid != -1) {
        filter.categoryId = categoryid;
    } else {
        filter = {};
    }
    const total = await Blog.find(filter).countDocuments();
    const result = await Blog.find(filter,
        {
            _id: 1,
            title: 1,
            description: 1,
            category: 1,
            scanNumber: 1,
            commentNumber: 1,
            toc: 1,
            thumb: 1,
            createDate:
                1
        })
        .skip((page - 1) * limit).limit(+limit).sort("-createDate").populate("categoryId", ["_id", "name"]);
    return {
        total: total,
        rows: result
    };
}

// 获取单篇文章
exports.getBlogById = async function (id) {
    await Blog.updateOne({ _id: id }, { $inc: { scanNumber: 1 } })
    const result = await Blog.findById(id, { __v: 0, comment: 0 }).populate("categoryId");
    if (result) {
        return result;
    }
    return null;
}

function handleTOC(info) {
    var result = toc(info.markdownContent).json;
    function transfer(flatArr) {
        const stack = [];
        const result = [];

        var min = 6; // 最小6级标题
        for (var i of flatArr) {
            if (i.lvl < min) {
                min = i.lvl;
            }
        }

        for (const item of flatArr) {
            const tocItem = createTOCItem(item); // 生成toc目录
            if (tocItem.level === min) {
                result.push(tocItem);
            }
            handleItem(tocItem);
        }
        return result;
        function createTOCItem(item) {
            return {
                name: item.content,
                anchor: `article-md-title-${item.i + 1}`,
                level: item.lvl,
                children: [],
            };
        }

        function handleItem(item) {
            const top = stack[stack.length - 1];
            if (!top) {
                stack.push(item);
            } else if (item.level > top.level) {
                // 作为其子目录
                top.children.push(item);
                stack.push(item);
            } else {
                stack.pop();
                handleItem(item);
            }
        }
    }
    info.toc = transfer(result);
    delete info.markdownContent;
    result = result.map(item => {
        return {
            name: item.content,
            anchor: `article-md-title-${item.i + 1}`,
            level: item.lvl
        }
    });
    // // 为各个级别标题添加上 id
    for (var prop of result) {
        switch (prop.level) {
            case 1: {
                var newStr = `<h1 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h1>', newStr);
                break;
            }
            case 2: {
                var newStr = `<h2 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h2>', newStr);
                break;
            }
            case 3: {
                var newStr = `<h3 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h3>', newStr);
                break;
            }
            case 4: {
                var newStr = `<h4 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h4>', newStr);
                break;
            }
            case 5: {
                var newStr = `<h5 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h5>', newStr);
                break;
            }
            case 6: {
                var newStr = `<h6 id="${prop.anchor}">`
                info.htmlContent = info.htmlContent.replace('<h6>', newStr);
                break;
            }
        }
    }
    return info;
}

// 添加文章
exports.addBlog = async function (blogObj) {
    const newBlogObj = handleTOC(blogObj);
    const result = await Blog.create(newBlogObj);
    await BlogType.updateOne({ _id: newBlogObj.categoryId }, { $inc: { articleCount: 1 } })
    return result;
}

// 更新文章
exports.setBlog = async function (id, blogInfo) {
    const blog = await Blog.findById(id);
    // 之前文章类型的数量-1
    if (blog.categoryId) {
        await BlogType.updateOne({ _id: blog.categoryId }, { $inc: { articleCount: -1 } })
    }
    // 当前的文章类型+1
    await BlogType.updateOne({ _id: blogInfo.categoryId }, { $inc: { articleCount: 1 } });
    const result = await Blog.findByIdAndUpdate(id, { $set: blogInfo }, { new: true })
    return result;
}

// 删除文章
exports.deleteBlog = async function (id) {
    const blog = await Blog.findById(id);
    if (blog) {
        if (blog.categoryId) {
            await BlogType.updateOne({ _id: blog.categoryId }, { $inc: { articleCount: -1 } });
        }
    }
    // 删除分类下所有的评论
    await Message.deleteMany({ blogId: blog._id });
    await Blog.deleteOne({ _id: id });
    return null;
}