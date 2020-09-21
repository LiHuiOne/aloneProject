<template>
  <div class="mianContainer">
    <div class="search">
      <search-group ref="searchForm" :initData="searchData" @search="getData"></search-group>
    </div>
    <div class="main_tab">
        <el-table :data="tableData" border align="center">
          <template v-for="item in tableColumn">
            <el-table-column
             :label="item.label"
             :show-overflow-tooltip="true"
             :key="item.prop"
             :prop="item.prop"
             :min-width="item.width"
             :formatter="item.formatter"
            />
          </template>
           <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import searchData from './mixin/search'
import tableColumn from './mixin/table'
export default {
  mixins:[searchData,tableColumn],
  data(){
    return{
      loading:false,
      tableData:[
        {codeId:'001',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'法师'},
        {codeId:'002',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'刺客'}
      ]
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

<style lang="scss">
  .main_tab{
    width: 100%;

  }
</style>
