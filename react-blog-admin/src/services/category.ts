import request from "./request";
export const getList = async () => request.get('/category/catelist')
export const addList = (data: { name: string }) => request.post('/category/add', { data })
export const updateList = (data: { id: number, name: string }) => request.post('/category/update', { data })
export const delList = (data: { id: number }) => request.post('/category/del', { data })
export const getLen = () => request.get('/category/total')