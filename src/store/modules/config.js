import * as type from '../mutation-type.js'
const systemConfig = {
    state:{
        leftAsideWidth:'190',
        aisdeCollape:false,
    },
    mutations:{
        [type.TOOGLE_ASIDE](state,aisdeCollape){
            state.aisdeCollape=aisdeCollape
            
        },
        [type.SET_THEME](state,theme){
            state.theme=theme
        }
    }
}
export default systemConfig