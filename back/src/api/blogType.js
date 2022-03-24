import request from '@/utils/request'

export function getBlogType() {
    return request.get("/api/blogtype");
}

export function addBlogType(data) {
    return request({
        url: "/api/blogtype",
        method: "post",
        data
    })
}

export function delBlogType(id) {
    return request.delete(`/api/blogtype/${id}`);
}

export function findOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: "get"
    })
}

export function updateOneBlogType(editInfo) {
    return request({
        url: `/api/blogtype/${editInfo.id}`,
        method: "put",
        data: editInfo.data
    })
}