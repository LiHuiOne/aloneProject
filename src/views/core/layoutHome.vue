<template>
  <div class="page_container">
    <div class="header_top">
      <div class="logo">
        <img :src="imgSrc" alt="" @click="goPageIndex">
      </div>
      <div class="header_right">
          <header-theme @toogleBgColor='toggleBg'></header-theme>
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
      <div class="container_right" :style="{left:aisdeCollape?leftAsideWidth:asideWidth}" :class="aisdeCollape?dContainser:zContainser">
        <div class="header_menu" v-if="menuList.length>0">
          <header-menu></header-menu>
        </div>
          <router-view v-if="isRouterActive"></router-view>
        
      </div>
    </div>
     
    
  </div>
</template>

<script>
 import {mapGetters, mapMutations, mapState} from 'vuex'
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterActive:true,
      asideWidth:'190',
      menus:[],
      imgSrc:require("@/assets/images/lg-logo.png"),
      zContainser:'zmain_container',
      dContainser:'dmain_container'
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
    ...mapGetters(['addRouters','aisdeCollape','leftAsideWidth','menuList']),
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
    reload(){
      this.isRouterActive=false;
      this.$nextTick(()=>{
        this.isRouterActive=true
      })
    },
    //点击图标进行菜单缩放
    ...mapMutations(['TOOGLE_ASIDE','DELETE_ALLMENU']),
    toggleAside(){
      this.TOOGLE_ASIDE(!this.aisdeCollape)
    },
    toggleBg(bgColor){
      //console.log(bgColor)
       window.document.documentElement.setAttribute('data-theme',bgColor)
    },
    goPageIndex(){
      this.DELETE_ALLMENU();//删除所有的vuex里的顶部菜单
      //点击图标会跳转到首页，但是会出现卡顿，后期优化
      this.$router.push({path:'/'})
      setTimeout(() => {
         window.location.reload()
      }, 50);
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
          cursor: pointer;
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
      .zmain_container{
        width: calc(100% - 218px);
      }
      .dmain_container{
        width: calc(100% - 98px);
      }
      .container_right{
        //calc(100% - 0px)这样设置宽度是让当侧边栏收缩的时候右边的宽度还是占右面100%
        //width: calc(100% - 0px);
        padding:10px 14px;
        // height: 100%;
        //动态主页面背景颜色，默认是$background-color-theme1
        @include bg_color($background-color-theme1);
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
