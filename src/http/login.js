import axios from "./api";
const userLogin = data => {
  return axios({
    url: `/api/login`,
    method: "post",
    data
  });
};
const getUserInfo = ()=> {
  return axios({
      url: '/api/currentuser',
      method: 'get',
  })
}

export default {
  userLogin,
  getUserInfo
};
