import { getList as getCateList } from 'services/category'
import { getList as getTagList } from 'services/tag'
import { message } from 'antd'

export const tip = '游客没有权限哦😭😭😭'
export const uploadUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/upload/postImg' : 'https://api.zhengyufang.top/upload/postImg'


export async function requestCate() {
    const categoryList = await getCateList()
    return categoryList.map((item: Category.CateProps) => ({
        label: item.name,
        value: item.id,
    }))
}
export async function requestTag() {
    const tagsList = await getTagList()
    return tagsList.map((item: Tag.TagProps) => ({
        label: item.name,
        value: item.id,
    }))
}

// cv 快乐！！！
export const throttle = (func: (...args: any) => void, wait: number, showTip: boolean = false) => {
    let previous = 0;
    return function (...args: any) {
        let now = +new Date();
        if (now - previous > wait) {
            func(...args);
            previous = now;
        }
        else if (showTip) {
            message.info('您的操作太频繁啦')
        }
    }
}