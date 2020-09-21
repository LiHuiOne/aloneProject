<template>
  <div class="mianContainer">
    
    <search-group ref="searchForm" :initData="searchData" @search="getData"></search-group>
    用户设置中心
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
  mounted(){

  },
  methods:{
    getData(){
      const form = this.$refs.searchForm ? this.$refs.searchForm.getFormData() : {};
      console.log(form)
    }
  }
};
</script>

<style>
</style>
