<template>
  <div class="page_container">
    <div class="header_top">
      <div class="logo">
        <!-- <img src="https://img.php.cn/upload/article/000/000/006/5f5ee101048f2386.jpg" alt=""> -->
        <img :src="imgSrc" alt="">
      </div>
      <div class="header_right">

      </div>
    </div>
    <div class="container_mian">
      <div class="container_left">
        <div class="menu-btn" @click="toggleAside">
            <span><i class="el-icon-caret-bottom"></i></span>
        </div>
        <aside-left :menus="menus" :asideWidth="asideWidth"></aside-left>
      </div>
      <div class="container_main">
        <router-view></router-view>
      </div>
    </div>
     
    
  </div>
</template>

<script>
 import {mapGetters, mapMutations, mapState} from 'vuex'
export default {
  data(){
    return {
      asideWidth:'190',
      menus:[],
      imgSrc:require("@/assets/images/lg-logo.png")
    }
  },
  components:{
    'aside-left': () => import("./components/aside")
  },
  computed:{
    ...mapGetters(['addRouters','aisdeCollape']),
    ...mapState({
      mainMenu:state=>state.permission.addRouters
    })
  },
  mounted(){
    //获取vueX里的菜单进行过滤，然后渲染菜单
    let menusList=this.mainMenu.find(item=>item.path=="/").children
    this.menus=menusList.filter(item=>item.path!="/home/default")
  },
  methods:{
    //点击图标进行菜单缩放
    ...mapMutations(['TOOGLE_ASIDE']),
    toggleAside(){
      this.TOOGLE_ASIDE(!this.aisdeCollape)
    }
  }
};
</script>

<style lang="scss" scoped>
  .page_container{
    display: flex;
    flex-direction: column;
    .header_top{
      height: 50px;
      width: 100%;
      display: flex;
      .logo{
        width: 190px;
        height: 100%;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .header_right{
        width: calc(100% - 190px);
        height: 100%;
        //background-image:linear-gradient(to right, red, yellow, blue, green);
        background:#f36c28;
      }
    }
    .container_mian{
      height: 100%;
      display: flex;
      .container_left{
        width: 190px;
      }
      .container_main{
        width: calc(100% - 190px);
        height: 100%;
      }
    }
  }
</style>
