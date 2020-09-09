import axios from "./api"; //导入使用axios方法
import common from "./common.js";
import userCenter from "./userCenter.js";
import login from "./login";
const getUserList = data => {
  return axios({
    url: `/api/getUser`,
    method: "get",
    data
  });
};
export default {
  getUserList,
  ...common,
  ...userCenter,
  ...login
};
