
import request from './request'

export const getList = (params: { id: number }) => request.get('/comment/commentlist', { params })
export const getLen = () => request.get('/comment/total')
export const insertComment = (params: Comment.CommentProps) => request.post('/comment/insertComment', params)
export const insertReply = (params: Comment.ReplyProps) => request.post('/comment/insertReply', params)
export const getAll = () => request.get('/comment/commentall')
export const delComment = (id: string) => request.post('/comment/delComment', { data: { id } })
export const delReply = (id: string) => request.post('/comment/delReply', { data: { id } })
export const delMultiple = (arr: Comment.CommentTable[]) => request.post('/comment/delMultiple', { data: { arr } })