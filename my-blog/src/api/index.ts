import { instance, instanceWithToken } from "./axios";
interface Articleprops {
    pageNo?: number;
    pageSize?: number
}
interface CommentProps {
    nickname: string;
    email: string;
    link?: string;
    avatar: string;
    post_id: number;
    time: string;
    content: string
}
interface ReplyProps {
    comment_id: string,
    nickname: string;
    email: string;
    link?: string;
    avatar: string;
    time: string;
    content: string
    to_reply_id: string;
    to_user_name: string
}
interface LoginProps {
    email: string;
    password: string;
}


export const getArticleList = (params: Articleprops) => instance.get('/article/articlelist', { params })
export const getArticleLen = () => instance.get('/article/total')
export const getArticleByCate = (id: number) => instance.get(`/article/listbycate?id=${id}`)
export const getArticleByTag = (id: number) => instance.get(`/article/listbytag?id=${id}`)
export const getArticleDetail = (id: number) => instance.get(`/article/detail?id=${id}`)
export const getSearch = (keywords: string) => instance.get(`/article/keywords?keywords=${keywords}`)


export const getCateList = () => instance.get('/category/catelist')
export const getCateLen = () => instance.get('/category/total')

export const getTagList = () => instance.get('/tag/taglist')
export const getTagLen = () => instance.get('/tag/total')

export const getSayList = () => instance.get('/say/saylist')

export const getTimelineList = () => instance.get('/timeline/timelinelist')

export const getAboutList = () => instance.get('/about/aboutlist')

// axios的get传参的方式为
// axios.get(url,{
//     params:{
//         key1:v1,
//         key2:v2
//     }
// })
export const getCommentList = (params: { id: number }) => instance.get('/comment/commentlist', { params })
export const insertComment = (params: CommentProps) => instance.post('/comment/insertComment', params)
export const insertReply = (params: ReplyProps) => instance.post('/comment/insertReply', params)


export const adminLogin = (params: LoginProps) => instance.post('/login', { ...params })
export const getInfo = () => instanceWithToken.post('/getInfo')