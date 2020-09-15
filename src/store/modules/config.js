import * as type from '../mutation-type.js'
const systemConfig = {
    state:{
        leftAsideWidth:'190',
        aisdeCollape:false,
    },
    mutations:{
        [type.TOOGLE_ASIDE](state,aisdeCollape){
            state.aisdeCollape=aisdeCollape
            state.leftAsideWidth=aisdeCollape?'64':'190'
        },
        [type.SET_THEME](state,theme){
            state.theme=theme
        }
    }
}
export default systemConfig