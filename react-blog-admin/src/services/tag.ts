import request from "./request";

export const getList = () => request.get('/tag/taglist')
export const addList = (data: { name: string }) => request.post('/tag/add', { data })
export const updateList = (data: { id: number, name: string }) => request.post('/tag/update', { data })
export const delList = (data: { id: number }) => request.post('/tag/del', { data })
export const getLen = () => request.get('/tag/total')