import request from '@/utils/request'

export function getMessage(page = 1, limit = 10) {
    return request.get("/api/message", {
        params: {
            page,
            limit,
        },
    });
}


export function addMessage(data){
    return request({
        url:"/api/message",
        method:"post",
        data
    })
}

export function delMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: "delete"
    })
}