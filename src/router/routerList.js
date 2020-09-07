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
        path:'/home',
        component:layoutHome,
        hidden:true,
        redirect:'/home/default',
        children:[
            {path:'/home/default', hidden:true,name:'default',meta:{title:'首页',component:()=>import('@/views/defaultHome/index')}}
        ]
    },
    {
        path:'/',
        redirect:{path:'/home'},
        component:layoutHome,
        hidden:true,
        children:[
            {
                path:'/settingCenter',
                name:'settingCenter',
                redirect:'/setting-user',
                component:RouterView,
                hidden:true,
                meta:{title:'设置中心',icon:''},
                children:(pre=>[
                    {path:'/setting/user',name:`${pre}user`,component:()=>import('@/views/pages/setting/userConter'),meta:{...meta,title:'用户中心'}}
                ])('setting-')
            }
        ]
    },
    ...userRouter
]
