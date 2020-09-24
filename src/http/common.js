import axios from "./api"; //导入使用axios方法
//配置公共的请求资源
const getCity = data => {
  return axios({
    url: "/api/getCity",
    method: "get",
    data
  });
};
const upLoadImg = data =>{
  return{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url:'/api/minio/upload',
    method:'post',
    data
  }

}
export default {
  getCity,
  upLoadImg
};