import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to,from,next)=>{
    //页面加载进度条加载动画
    NProgress.start()
    if(localStorage.getItem('userInfo')){
        //已登录去首页
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            next()
        }
    }
    else{
        //next('/login')造成死循环
        if(to.path=='/login'){
            //重新触发的时候回进入到这里,然后直接跳转到登录页
            next()
        }else{
            //第一次会走到这个位置，然后重新触发路由钩子函数beforeEach,
            //当重新触发钩子函数的时候这时的to.path已经变为/login
            next('/login')
        }
    }
    next()//一定要调用next(),否则会造成页面卡死在登录页
})
router.afterEach(()=>{
    NProgress.done();//结束加载动画
})