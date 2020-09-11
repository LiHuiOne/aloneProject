//如果使用{userLogin}这种方式导入的话，那么必须是export单个导出的，不能使用export default
//因为export default其输出的本来就只有一个接口，提供的是模块的默认接口，自然不需要使用大括号包裹。
//可以利用对象的形式进行获取
//import {userLogin} from '@/http/login.js'
import userApi from '@/http/login.js'
const users={
    state:{
        userInfo:{name:'ce'},//个人信息
        roleList:[],
        actionList:[]
    },
    mutations:{
        SET_USERINFO:(state,data)=>{
            state.userInfo=data
        },
        SET_ROLEINFO:(state,data)=>{
            state.roleList=data
        },
        SET_ACTIONS:(state,data)=>{
            state.actionList=data;
        }
    },
    actions:{
        Login(state,userInfo){
            return new Promise((resolve, reject) => {
                userApi.userLogin(userInfo).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default users