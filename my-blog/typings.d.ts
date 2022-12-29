import axios from 'axios'//就算有波浪线也不能去掉 去掉就不对了
declare module '*.styl'
declare module '*.module.styl'

declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> { }
}