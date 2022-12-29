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

