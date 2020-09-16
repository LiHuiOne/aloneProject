<template>
<!-- 第一种：el-dropdown中command触发点击事件必须与el-dropdown-item相配合 -->
    <el-dropdown @command="choosed">
        <span class="el-dropdown-link">
              当前登录：小灰灰<i class="el-icon-arrow-down el-icon--right"></i>
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
                downMenuList:[{name:'注销登录',index:'0'},{name:'个人信息',index:'1'}]
            }
        },
        methods:{
            choosed(item){
                //this.menuName=item.name
                //console.log(item)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>