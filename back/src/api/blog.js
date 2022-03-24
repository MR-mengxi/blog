import request from '@/utils/request'

export function findBlog(page = 1, limit = 10) {
    return request({
        url: "/api/blog",
        method: "get",
        params: {
            page,
            limit
        }
    })
}

export function delOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "delete",
    })
}

export function addBlog(data) {
    return request({
        url: "/api/blog",
        method: "post",
        data
    })
}

export function editBlog(id,blogInfo) {
    return request({
        url: `/api/blog/${id}`,
        method: "put",
        data: blogInfo
    })
}

export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: "get"
    })
}