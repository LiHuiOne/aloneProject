import axios from "./api";
const getUserInfo = userId => {
  return axios({
    url: `/api/getUserInfo/${userId}`,
    method: "get"
  });
};
export default {
  getUserInfo
};
