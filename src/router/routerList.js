import layoutHome from '@/views/core/layoutHome.vue'
import userRouter from './user.js'
// const meta = {
//     requiresAuth: false,
//     keepAlive: false
// }
export const rotuerMapList=[
    {
        path: "*",
        redirect: "/",
        hidden: true,
    },
    {
        path:'/',
        component:layoutHome
    },
    {
        path:'/home',
        component:layoutHome
    },
    {
        path:'/login',
        component:()=>import('@/views/core/login.vue')
    },
    ...userRouter
]
//后期用于校验
// export const loginRouterMap=[
//     {
//         path:'/login',
//         component:'@/views/core/login.vue'
//     }
// ]