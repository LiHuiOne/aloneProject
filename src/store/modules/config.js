import * as type from '../mutation-type.js'
const systemConfig = {
    state:{
        leftAsideWidth:'190',
        aisdeCollape:false,
        menuList:[],//保存顶部导航栏的菜单
        modeIndex:'0',//0是前台管理，1是后台管理
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
        //设置顶部导航菜单
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
        },
        //点击logo的时候清空所有的顶部菜单
        [type.DELETE_ALLMENU](state){
            state.menuList=[];
        },
        //切换顶部的管理类型，//已弃用，用localStorage
        [type.TOOGLE_MANMODE](state,type){
            state.modeIndex=type
        }
    }
}
export default systemConfig