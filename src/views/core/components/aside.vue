<template>
   <el-menu class="el-menu-vertical-demo" :collapse="aisdeCollape">
    <el-submenu v-for="item in menusList" :index="item.path" :key="item.path">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.meta.title}}</span>
        </template>
        <el-menu-item-group v-show="item.children">
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path">
             <router-link :to="subItem.path" @click.native="saveChooedMenu(subItem)">{{subItem.meta.title}}</router-link>
            </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
</el-menu>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
    export default {
    data() {
      return {
        isCollapse: true,
        menusList:[],
        asideLeftWidth:'190px'
      };
    },
    computed:{
        ...mapGetters(['aisdeCollape'])
    },
    props:['menus','asideWidth'],
    watch:{
        menus(){
            this.menusList=this.menus
            this.asideLeftWidth=this.asideWidth
        }
    },
    mounted(){
        this.menusList=this.menus
        this.asideLeftWidth=this.asideWidth
        
    },
    methods: {
        ...mapMutations(['SET_HMENU']),
        saveChooedMenu(menuInfo){
            let menu={path:menuInfo.path,title:menuInfo.meta.title}
            this.SET_HMENU(menu)
        }
    }
  }
</script>

<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 190px;
    /* min-height: 400px; */
  }
</style>