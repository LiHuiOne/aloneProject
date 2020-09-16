<template>
<!-- 第一种：el-dropdown中command触发点击事件必须与el-dropdown-item相配合 -->
    <el-dropdown @command="choosed">
        <span class="el-dropdown-link">
              {{menuName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in downMenuList" :key="item.index" :command="item">{{item.name}}</el-dropdown-item>
            <!-- 第二种方式click.native -->
            <!-- <el-dropdown-item v-for="item in downMenuList" :key="item.index" @click.native="choosed(item)">{{item.name}}</el-dropdown-item> -->
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import {mapMutations} from 'vuex'
    export default {
        data(){
            return{
                downMenuList:[{name:'前台管理',index:'0'},{name:'后台管理',index:'1'}],
                menuName:''
            }
        },
        mounted(){
            //this.menuName=this.downMenuList[0].name
            this.menuName=localStorage.getItem('modeName')?localStorage.getItem('modeName'):this.downMenuList[0].name
        },
        methods:{
            ...mapMutations(['TOOGLE_MANMODE']),
            choosed(item){
                //this.menuName=item.name
                localStorage.setItem('modeName',item.name)
                localStorage.setItem('modeIndex',item.index)//将切换前后台的index放到localStorage
                //this.TOOGLE_MANMODE(localStorage.getItem('modeIndex'))
                //this.TOOGLE_MANMODE(item.index)
                //跳转到首页
                this.$router.push({path:'/'})
                window.location.reload()
            }
        }
    }
</script>

<style scoped>

</style>