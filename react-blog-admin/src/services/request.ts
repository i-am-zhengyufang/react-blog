import { extend, ResponseError } from 'umi-request';
import { history } from 'umi';
import { message } from 'antd'
let baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://api.zhengyufang.top'

const errorHandler = (error: ResponseError) => {
  const { response } = error;
  return response;
};
const request = extend({
  prefix: baseURL,
  timeout: 8000,
  errorHandler,
});

request.interceptors.request.use((url: string, options: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      }
    }
  }
  return {
    url,
    options
  }
});


request.interceptors.response.use(async response => {
  // 麻烦死了必须还得这样才能拿到数据
  const res = await response.clone().json();
  if (res.code && res.code == 403) {
    message.warning('身份已过期请重新登录🌭🌭')
    localStorage.removeItem('token');
    history.push('/login');
  }
  return res;
});





export default request;
