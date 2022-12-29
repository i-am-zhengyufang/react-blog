import request from "./request";
export const getList = async () => request.get('/timeline/timelinelist')
export const insert = (params: SayOrTimeLine.InsertProps) => request.post('/timeline/insert', { data: { params } })
export const update = (params: SayOrTimeLine.Params) => request.post('/timeline/update', { data: { params } })
export const del = (id: number) => request.post('/timeline/del', { data: { id } })