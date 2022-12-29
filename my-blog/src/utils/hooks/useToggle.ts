import { useState, useMemo } from "react";
export const useToggle = (defaultVal: boolean = false) => {
    const [state, setState] = useState(defaultVal)
    const actions = useMemo(() => {
        const toggle = () => setState(state => !state)//不能用setState(!state)否则好像获取不到最新的state
        const setLeft = () => setState(defaultVal)
        const setRight = () => setState(!defaultVal)
        return {
            toggle,
            setLeft,
            setRight
        }
    }, [])
    return [state, actions]
}

export default useToggle;

