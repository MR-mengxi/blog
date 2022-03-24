import request from './request';

/**
 * 获取博客列表的数据
 * @param {*} page 
 * @param {*} limit 
 * @param {*} categoryid 
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid
        }
    })
}

/**
 * 获取博客分类
 */
export async function getBlogCategories() {
    return await request.get("/api/blogtype");
}

/**
 * 获取一个博客
 * @param {*} id 
 */
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 * @param {*} commentInfo 
 */
export async function postComment(commentInfo) {
    return await request.post("/api/comment", commentInfo);
}

/**
 * 根据博客id，获取评论
 * @param {*} blogid 
 * @param {*} page 
 * @param {*} limit 
 */
export async function getComments(blogid, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogid,
            page,
            limit
        }
    })
}