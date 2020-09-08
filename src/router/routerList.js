import layoutHome from '@/views/core/layoutHome.vue'
import RouterView from '@/views/core/routerView.vue'
import userRouter from './user.js'
const meta = {
    requiresAuth: false,
    keepAlive: false
}
export const rotuerMapList=[
    {
        path: "*",
        redirect: "/",
        hidden: true,
    },
    {
        path:'/',
        component:layoutHome,
        redirect:'/home/default',
        children:[
            {
                path:'/home/default',
                redirect:'index',
                component:RouterView,
                children:[
                    {path:'/index',component:()=>import('@/views/defaultHome/index'),meta:{...meta,title:'首页'}}
                ]
            },
            {
                path:'/settingCenter',
                name:'settingCenter',
                component:RouterView,
                redirect:'/setting/user',
                meta:{title:'设置中心',icon:''},
                children:(pre=>[
                    {path:'/setting/user',name:`${pre}user`,component:()=>import('@/views/pages/setting/userConter'),meta:{...meta,title:'用户中心'}}
                ])('setting-')
            },
        ]
    },
    //登录页只能单独放置。否则不能把整个内容(首页)覆盖掉
    ...userRouter
]
