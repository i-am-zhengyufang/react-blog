import request from "./request";



// umi-request
// 的post必须用data:{id:1,name:''}这种 要不然后端死活拿不到数据
export const getList = (params: Article.ArticleParams) => request.get('/article/articlelist', { params })

export const getListByCate = (id: number) => request.get(`/article/listbycate?id=${id}`)
export const getListByTag = (id: number) => request.get(`/article/listbytag?id=${id}`)
export const getDetail = (id: number) => request.get(`/article/detail?id=${id}`)
export const getSearch = (keywords: string) => request.get(`/article/keywords?keywords=${keywords}`)
export const getLen = () => request.get(`/article/total`)
export const delList = (id: number) => request.post(`/article/del`, { data: { id } })
export const insert = (data: Article.InsertProps) => request.post(`/article/insert`, { data })
export const update = (data: Article.UpdateProps) => request.post(`/article/update`, { data })