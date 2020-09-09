import axios from "./api";
const userLogin = data => {
  return axios({
    url: `/api/login`,
    method: "post",
    data
  });
};
export default {
  userLogin
};
