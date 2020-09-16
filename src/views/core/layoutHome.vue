<template>
  <div class="page_container base_bg">
    <div class="header_top">
      <div class="logo">
        <img :src="imgSrc" alt="">
      </div>
      <div class="header_right">
          <header-theme></header-theme>
          <header-active></header-active>
          <header-user></header-user>
      </div>
    </div>
    <div class="container_mian">
      <div class="container_left aside_bg">
        <div class="menu_btn" @click="toggleAside">
            <span><i :class="aisdeCollape?'el-icon-s-unfold':'el-icon-s-fold'"></i></span>
        </div>
        <aside-left :menus="menus" :asideWidth="asideWidth"></aside-left>
      </div>
      <div class="container_right" :style="{left:aisdeCollape?leftAsideWidth:asideWidth}">
        <div class="header_menu">
          <header-menu></header-menu>
        </div>
        
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
    'aside-left': () => import("./components/aside"),
    'header-menu':() => import('./components/header-menu'),
    'header-active':() => import('./components/header-active'),
    'header-user':() => import('./components/header-user'),
    'header-theme':() => import('./components/header-theme')
  },
  computed:{
    ...mapGetters(['addRouters','aisdeCollape','leftAsideWidth']),
    ...mapState({
      mainMenu:state=>state.permission.addRouters
    })
  },
  mounted(){
    //获取vueX里的菜单进行过滤，然后渲染菜单
    //console.log(this.mainMenu)
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
<style lang="scss">
@import "@/style/theme/register.scss";
  .page_container{
    height: 100vh;//视口的高度
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
        .el-dropdown{
          float: right;
          line-height: 50px;
          margin-right: 20px;
        }
      }
    }
    .container_mian{
      height: 100%;
      display: flex;
      .container_left{
        // width: 190px;
        .menu_btn{
          height: 40px;
          text-align: center;
          line-height: 40px;
          span{
            cursor: pointer;
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
      .container_right{
        //calc(100% - 0px)这样设置宽度是让当侧边栏收缩的时候右边的宽度还是占右面100%
        width: calc(100% - 0px);
        // height: 100%;
        //background:#f0f0f0;
        .header_menu{
          height: 40px;
          background: #ffffff;
          padding-left: 10px;
          &>div{
            line-height: 40px;
          }
        }
      }
    }
  }
</style>
