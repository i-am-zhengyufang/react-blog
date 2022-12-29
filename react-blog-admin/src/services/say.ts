import request from "./request";
export const getList = async () => request.get('/say/saylist')
export const insert = (params: SayOrTimeLine.InsertProps) => request.post('/say/insert', { data: { params } })
export const update = (params: SayOrTimeLine.Params) => request.post('/say/update', { data: { params } })
export const del = (id: number) => request.post('/say/del', { data: { id } })