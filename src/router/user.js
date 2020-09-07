import RouterView from '@/views/core/routerView.vue'
const meta = {
    requiresAuth: false,
    keepAlive: false
}

export default[
    {
        path: '/login',
        name: 'login', 
        redirect: '/login', 
        component: RouterView, 
        meta: { title: '登录', icon: ''},
        children:[
            {path:'/login', hidden:true,name:'login',component:()=>import('@/views/core/login'),meta:{...meta,title:'登录页面'}}
        ]
    }
]