import layoutHome from "@/views/core/layoutHome.vue";
import RouterView from "@/views/core/routerView.vue";
import userRouter from "./user.js";
const meta = {
  requiresAuth: false,
  keepAlive: false
};
export const rotuerMapList = [
  {
    path: "*",
    redirect: "/",
    hidden: true
  },
  {
    path: "/",
    component: layoutHome,
    redirect: "/home/default",
    children: [
      {
        path: "/home/default",
        redirect: "/index",
        name:'index',
        component: RouterView,
        children: [
          {
            path: "/index",
            component: () => import("@/views/defaultHome/index"),
            meta: { ...meta, title: "首页" }
          }
        ]
      },
      {
        path: "/settingCenter",
        name: "settingCenter",
        component: RouterView,
        meta: { title: "设置中心", icon: "",permission:['settingCenter']},
        children: (pre => [
          {
            path: "/setting/userManage",
            name: `${pre}userManage`,
            component: () => import("@/views/pages/setting/userConter"),
            meta: { ...meta, title: "用户设置", permission: ["userManage"] }
          },
          {
            path: "/setting/roleManage",
            name: `${pre}roleManage`,
            component: () => import("@/views/pages/setting/roleCenter"),
            meta: { ...meta, title: "角色设置", permission: ["roleManage"] }
          }
        ])("setting-")
      },
      {
        path: "/dataCenter",
        name: "dataCenter",
        component: RouterView,
        meta: { title: "数据中心", icon: "",permission:['dataCenter']},
        children: (pre => [
          {
            path: "/dataCenter/risk",
            name: `${pre}risk`,
            component: () => import("@/views/pages/dataCenter/riskData"),
            meta: { ...meta, title: "风险数据", permission: ["riskData"] }
          },
          {
            path: "/dataCenter/car",
            name: `${pre}car`,
            component: () => import("@/views/pages/dataCenter/carData"),
            meta: { ...meta, title: "车辆数据", permission: ["carData"] }
          }
        ])("dataCenter-")
      }
    ]
  },
  //登录页只能单独放置。否则不能把整个内容(首页)覆盖掉
  ...userRouter
];
export const userLoginMap = [
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/core/login')
  }
]
