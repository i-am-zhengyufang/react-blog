import axios from "axios";
import { baseURL, timeout } from "../utils/constant";

const createBase = () => {
  let options: any = {
    baseURL,
    timeout
  }

  // 不能直接写options.headers.Authorization=token会报错
  const instance = axios.create(options);


  instance.interceptors.response.use(
    (res) => {
      //  由于只有一个请求使用到了token 因此采取自动刷新token，不必担心并发请求的问题
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
// 之前试过在createBase里面设置请求头，但是拿到的token始终是最初的，即null
instanceWithToken.interceptors.request.use(option => {
  const token = localStorage.getItem('token')
  option.headers = {
    authorization: 'Bearer ' + token
  }
  return option
})


// 如果加loading需要把后缀名改为tsx 我看网上也很少这样用的，我还是别搞了好就呜呜呜，没有vue那么方便
// let loadCnt = 0;

// const mixLoading = (params: AxiosInstance) => {
//   params.interceptors.request.use((config) => {
//     if (loadCnt === 0) {
//       console.log("啥情况");

//       const dom = document.createElement("div");
//       dom.setAttribute("id", "loading");
//       document.body.appendChild(dom);
//       createRoot(dom).render(<Spin tip="loading...." size="large" />);
//     }
//     loadCnt++;
//     return config; // 就算没用config也一定记得return哦
//   });

//   params.interceptors.response.use((config) => {
//     loadCnt--;
//     if (loadCnt === 0) {
//       document.body.removeChild(document.getElementById("loading")!);
//     }
//     return config;
//   });
// };

// export const instanceWithLoad = createBase();
// mixLoading(instanceWithLoad);
