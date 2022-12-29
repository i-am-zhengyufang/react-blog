import request from "./request";

export const getList = () => request.get('/about/aboutlist')
export const update = (data: { id: number, content: string }) => request.post('/about/update', { data })