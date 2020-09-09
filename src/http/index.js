import apiList from "./interface"; //导入所有的接口
//将$api挂载到原型上，访问接口可以通过(this.$api.接口名称)进行访问
const install = Vue => {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList;
      }
    }
  });
};

export default install;
