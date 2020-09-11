import Vue from "vue";
import Vuex from "vuex";
import userLogin from './modules/user.js'
import getters from './getter.js'
import systemConfig from './modules/config.js'
import users from './modules/user.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userLogin,
    systemConfig,
    users
  },
  getters
});
