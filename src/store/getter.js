const getters={
    //系统
    leftAsideWidth:state=>state.systemConfig.leftAsideWidth,
    aisdeCollape:state=>state.systemConfig.aisdeCollape,
    theme:state=>state.systemConfig.theme,
    menuList:state=>state.systemConfig.menuList,
    modeIndex:state=>state.systemConfig.modeIndex,//已弃用，用localStorage
    //user
    userInfo:state=>state.users.userInfo,
    roleList:state=>state.users.roleList,
    actionList:state=>state.users.actionList,
    //permission
    addRouters:state=>state.permission.addRouters
}
export default getters