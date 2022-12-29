import request from "./request";
export const login = (params: User) => request.post('/login', { data: params })
export const getInfo = () => request.post('/getInfo')
export const vistor = () => request.get('/vistor')
