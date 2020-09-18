<template>
  <div class="mianContainer">
    用户设置中心
    <search-group :initData="searchData"></search-group>
  </div>
</template>

<script>
import searchData from './mixin/search'
import tableData from './mixin/table'
export default {
  mixins:[searchData,tableData],
  data(){
    return{
    }
  },
  components:{
    'search-group':()=>import("@/components/searchGroup/search-group")
  },
  methods:{

  }
};
</script>

<style>
</style>
