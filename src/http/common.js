import axios from "./api"; //导入使用axios方法
//配置公共的请求资源
const getCity = data => {
  return axios({
    url: "/api/getCity",
    method: "get",
    data
  });
};
export default {
  getCity
};
