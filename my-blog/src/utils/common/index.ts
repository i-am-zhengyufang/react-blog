import dayjs from 'dayjs';
import { message } from "antd";

export const backToTop = (dom: HTMLElement) => {
    dom.scrollIntoView({ behavior: "smooth" })
}

export const getTime = () => {
    const date = new Date();
    const hours = date.getHours() / 12 * 360;
    const minutes = date.getMinutes() / 60 * 360;
    const seconds = date.getSeconds() / 60 * 360;
    return { hours, minutes, seconds }
}

export const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export const formatNum = (num: number) => {
    return num > 1000 ? `${Math.round(num / 1000)}k` : num
}


export const throttle = (func: (...args: any) => void, wait: number, showTip: boolean = false) => {
    let timeout: any
    return function (...args: any) {
        if (!timeout) {
            if (showTip) {
                message.info('您的操作太频繁啦')
            }
            timeout = setTimeout(() => {//要么箭头函数，要么外层保存let that=this，如果使用arguments注意也要在外层保存
                timeout = null
                func.apply(args)
            }, wait);
        }

    }
    //之前通过这种方式，会导致停止操作后不再触发
    // let previous = 0;
    // return function (...args: any) {
    //     let now = +new Date();

    //     if (now - previous > wait) {
    //         func(...args);
    //         previous = now;
    //     }
    //     else if (showTip) {
    //         message.info('您的操作太频繁啦')
    //     }
    // }
}



// 一开始用的是这种节流发现不行，点击按钮之后不能立即执行，就跟卡住了一样
// 你看前端面试的笔记里面就有两种，一种时间戳，一种定时器，自己好好区分一下
// export const throttle = (fn: (...args: any) => void, ms: number = 2000, showTip: boolean = false) => {
//     let timer: ReturnType<typeof setTimeout> | null;
//     return function (...args: any) {
//         if (timer) {
//             if (showTip) message.info('uu您的操作太频繁啦')
//             return;
//         }
//         timer = setTimeout(() => {
//             fn(...args);
//             timer = null;
//         }, ms);
//     }
// }
