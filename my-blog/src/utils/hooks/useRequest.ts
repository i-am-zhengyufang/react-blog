import { useEffect, useState } from "react";


export const useRequest = (fetch: Function, params: object, trigger = []) => {
    const [data, setData] = useState()
    // 我一开始初始化为{}导致后面判断data&&data.map这种，data为{}为真，因此会报错data.map不是function
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState()
    // useEffect不能使用async 因此这里采用立即执行函数
    useEffect(() => {
        (async () => {
            setisLoading(true)
            try {
                let data = await fetch(params)
                setData(data)
            } catch (e: any) {
                setError(e)
            } finally {
                setisLoading(false)
            }
        })()
    }, trigger)
    return { data, isLoading, error }
}

const func = function (): Promise<string> {
    return new Promise(resolve => {

        // setTimeout(() => {
        //     resolve('a')
        // }, 1000);
    })
}

export const useRequest1 = () => {
    const [data, setData] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()
    // useEffect不能使用async 因此这里采用立即执行函数
    useEffect(() => {
        (async () => {
            setisLoading(true)
            try {
                let data = await func()
                setData(data)
            } catch (e: any) {
                setError(e)
            } finally {
                setisLoading(false)
            }
        })()
    })
    return { data, isLoading, error }
}