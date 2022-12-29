import { useEffect, useRef } from "react"

type TargetElement = HTMLElement | Element | Document | Window;
type Options = {
    target?: TargetElement,
    capture?: boolean,
    once?: boolean,
    passive?: boolean
};
// options是必传的，必须传递一个target

export const useEventListener = (eventName: string, handler: Function, options?: Options) => {

    const savehandler = useRef<Function>()
    // 当事件发生变化时，只是触发current改变，不会重新下面执行，这只是我的理解，后面再看看吧
    useEffect(() => {
        savehandler.current = handler
    }, [handler])

    useEffect(() => {
        const element = options?.target || window
        const ismobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        //   match符合会返回数组 不符合为null
        if (!element || !element.addEventListener || ismobile) return
        const eventListener = (event: Event) => savehandler.current && savehandler.current(event)
        element.addEventListener(eventName, eventListener, {
            capture: options?.capture,
            once: options?.once,
            passive: options?.passive
        })
        return () => element.removeEventListener(eventName, eventListener)
    }, [eventName, options?.target, options?.capture, options?.once, options?.passive])
}

