import Vue from "vue";
import VueRouter from "vue-router";
import { rotuerMapList } from './routerList.js'

Vue.use(VueRouter);

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes:rotuerMapList
});

export default router;
