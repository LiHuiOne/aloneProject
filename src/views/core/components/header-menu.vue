<template>
<div>
    <template>
        <el-tag :key="tag.path" v-for="tag in menuTags" closable :disable-transitions="false" @close="handleClose(tag)">
            <router-link :to="tag.path">{{tag.title}}</router-link>
        </el-tag>
    </template>
</div>
    
</template>
<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        menuTags: [],
        inputVisible: false,
        inputValue: ''
      };
    },
    computed:{
        ...mapGetters(['menuList']),
    },
    mounted(){
        this.menuTags=this.menuList
    },
    methods: {
        ...mapMutations(['DELETE_HMENU']),
        handleClose(tag) {
            this.DELETE_HMENU(tag)
            //this.menuTags.splice(this.menuTags.indexOf(tag), 1);
        }
    }
  }
</script>
<style lang="scss" scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>