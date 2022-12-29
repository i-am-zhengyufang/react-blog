import { useState, useMemo } from "react";
export const useBoolean = (defaultVal: boolean = false) => {
    const [state, setState] = useState(defaultVal)
    const actions = useMemo(() => {
        const toggle = () => setState(state => !state)//不能用setState(!state)否则好像获取不到最新的state
        const setTrue = () => setState(true)
        const setFalse = () => setState(false)
        return {
            toggle,
            setTrue,
            setFalse
        }
    }, [])
    return [state, actions]
}

export default useBoolean;

