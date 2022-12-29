import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { startTime } from '../constant'

export const useRunTime = () => {
    const [runTime, setRunTime] = useState(0);
    useEffect(() => {
        const nowTime = new Date().getTime();
        const runTime = dayjs(nowTime).diff(dayjs(startTime), 'days')
        setRunTime(runTime)
    }, [runTime]);
    return runTime
}
