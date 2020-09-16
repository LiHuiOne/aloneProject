import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from './store'
router.beforeEach((to, from, next) => {
  //页面加载进度条加载动画
  NProgress.start();
  // console.log(from)
  // console.log(to)
  if (localStorage.getItem("userInfo")) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //判断vuex是否具有权限数据
      if(store.getters.roleList.length==0){
        //调用接口GetInfo获取当前登录信息
        //store.dispatch('GetInfo').then(res=>{
          const menuList=["settingCenter","userManage","dataCenter","riskData"]
          store.dispatch('GenerateRoutes', { roles:menuList }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              //console.log(store.getters.addRouters)

          }).catch((e) => { 
          });
        //})
      }else{
        next();
      }
      
    }
  } else {
    //next('/login')造成死循环
    if (to.path == "/login") {
      //重新触发的时候回进入到这里,然后直接跳转到登录页
      next();
    } else {
      //第一次会走到这个位置，然后重新触发路由钩子函数beforeEach,
      //当重新触发钩子函数的时候这时的to.path已经变为/login
      next("/login");
    }
  }
  next(); //一定要调用next(),否则会造成页面卡死在登录页
});
router.afterEach(() => {
  NProgress.done(); //结束加载动画
});
