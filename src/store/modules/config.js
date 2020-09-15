import * as type from '../mutation-type.js'
const systemConfig = {
    state:{
        leftAsideWidth:'190',
        aisdeCollape:false,
        menuList:[]//保存顶部导航栏的菜单
    },
    mutations:{
        //切换侧边栏
        [type.TOOGLE_ASIDE](state,aisdeCollape){
            state.aisdeCollape=aisdeCollape
            state.leftAsideWidth=aisdeCollape?'64':'190'
        },
        [type.SET_THEME](state,theme){
            state.theme=theme
        },
        //设置顶部导航擦弹
        [type.SET_HMENU](state,menu){
            let index=state.menuList.findIndex(item=>item.path==menu.path)
            //如果没有则插入
            if(index==-1){
                state.menuList.push(menu)
            }
        },
        //删除顶部菜单
        [type.DELETE_HMENU](state,menu){
            state.menuList.splice(state.menuList.indexOf(menu),1)
        }
    }
}
export default systemConfig