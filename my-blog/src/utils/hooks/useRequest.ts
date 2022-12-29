import { useEffect, useState } from "react";


export const useRequest = (fetch: Function, params: object, trigger = []) => {
    const [data, setData] = useState()
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


