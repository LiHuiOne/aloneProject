<template>
<!-- 第一种：el-dropdown中command触发点击事件必须与el-dropdown-item相配合 -->
    <el-dropdown @command="choosed">
        <span class="el-dropdown-link">
              主题切换<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in downMenuList" :key="item.index" :command="item">{{item.name}}</el-dropdown-item>
            <!-- 第二种方式click.native -->
            <!-- <el-dropdown-item v-for="item in downMenuList" :key="item.index" @click.native="choosed(item)">{{item.name}}</el-dropdown-item> -->
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        data(){
            return{
                downMenuList:[{name:'默认',index:'theme1'},{name:'淡灰',index:'theme2'},{name:'淡墨绿',index:'theme3'}],
                menuName:''
            }
        },
        mounted(){
            this.menuName=this.downMenuList[0].name
        },
        methods:{
            choosed(item){
                this.menuName=item.name
                this.$emit('toogleBgColor',item.index)
                //console.log(item)
            }
        }
    }
</script>
<style lang="scss" scoped>
  
</style>