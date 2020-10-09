import axios from "axios"; // 注意先安装
import config from "./config.js"; // 倒入默认配置
import { Message } from "element-ui";
import { isString } from "util";
//配置请求和响应拦截器(axios的二次封装)
export default function $axios(options) {
  //可以设置读取配置打包的环境
  //const API_URL = process.env.VUE_APP_URL;
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      //baseURL: API_URL,
      baseURL: config.baseURL,
      headers: config.headers
    });
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        //可以验证token
        // const adminToken = Cookies.get('admin-token');
        // if (adminToken) {
        //     config.headers['Authorization'] = adminToken
        // }
        //不走nginx代理的话需要把前面代理去掉
        //config.url=config.url.replace('/api','');
        return config;
      },
      err => {
        Message.error({ message: "请求超时!" });
        return Promise.resolve(err);
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        if (response.data == undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        if (!isString(data) && data.success !== undefined && !data.success) {
          Message.error({ message: data.i18nMessage });
        }
        return data;
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "您无权访问此接口";
              //  可以在此移除本地缓存
              //   Cookies.remove("admin-token");
              //   Cookies.remove("admin-uuid");
              window.location.reload();
              break;
            case 403:
              err.message = "拒绝访问";
              break;

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`;
              break;

            case 408:
              err.message = "请求超时";
              break;

            case 500:
              err.message = "服务器内部错误";
              break;

            case 501:
              err.message = "服务未实现";
              break;

            case 502:
              err.message = "网关错误";
              break;

            case 503:
              err.message = "服务不可用";
              break;

            case 504:
              err.message = "网关超时";
              break;

            case 505:
              err.message = "HTTP版本不受支持";
              break;

            default:
          }
        }
        if (err.response.status !== 401) {
          Message.error({ message: err.message });
        }
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    // 请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
}
