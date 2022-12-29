import axios from "axios";
import { baseURL, timeout } from "../utils/constant";

const createBase = () => {
  let options: any = {
    baseURL,
    timeout
  }

  const instance = axios.create(options);


  instance.interceptors.response.use(
    (res) => {
      //  由于只有一个请求使用到了token 因此采取自动刷新token
      const refresh_token = res.headers?.refresh_token
      if (refresh_token) {
        localStorage.setItem('token', refresh_token)
      }

      return res.data;
    },
    (error) => {
      throw error;
    }
  );

  return instance
}

export const instance = createBase();
export const instanceWithToken = createBase();
instanceWithToken.interceptors.request.use(option => {
  const token = localStorage.getItem('token')
  option.headers = {
    authorization: 'Bearer ' + token
  }
  return option
})


