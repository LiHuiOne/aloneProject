<template>
  <div class="mianContainer">
    <div class="search">
      <search-group ref="searchForm" :initData="searchData" @search="getData"></search-group>
    </div>
    <div class="main_tab">
        <el-table 
        :data="tableData"
        :header-cell-style="{
          'background-color': '#f0f0f0',
          'border-bottom': '1px RGBA(199, 199, 199, 1) solid'
        }">
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
           <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="showDetail(row)">添加</el-button>
              <el-button type="text" size="small" @click="showDetail(row)">查看</el-button>
              <el-button type="text" size="small" @click="showDetail(row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
          v-if="tableData.length>0"
          @size-change="getData"
          @current-change="getData"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="paBar.total">
      </el-pagination>
    </div>
    <dialog-info v-if="isRouterActive" :title="'详情'" :diaStatus="diaStatus" :diaData="diaData" @closeDia="closeDia"></dialog-info>
  </div>
  
</template>

<script>
import searchData from './mixin/search'
import tableColumn from './mixin/table'
import dialogData from './mixin/dialog'
export default {
  mixins:[searchData,tableColumn],
  inject:['reload'],
  data(){
    return{
      isRouterActive:true,
      loading:false,
      tableData:[
        {codeId:'001',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'法师'},
        {codeId:'002',userName:'测试',age:20,address:'浙江省下城隼目科技',conPer:'小灰灰',work:'前端开发',roleName:'刺客'}
      ],
      paBar:{
        pageNum:1,
        pageSize:100,
        total:100
      },
      currentPage: 1,
      diaStatus:false,
      diaData:[]
    }
  },
  components:{
    'search-group':()=>import("@/components/searchGroup/search-group"),
    'dialog-info':()=>import("@/components/dialog")
  },
  computed:{
   
  },
  mounted(){
    this.diaData=dialogData
  },
  methods:{
    getData(){
      const form = this.$refs.searchForm ? this.$refs.searchForm.getFormData() : {};
      const params = {
        pageNum:this.currentPage,
        pageSize: 10
      }
      console.log(form)
      // const data = await this.$api.postCustomersList({...params,...form});
      // this.loading = false;
      // if (data.success) {
      //     this.tableData = data.datas.content;
      //     this.pagebar = {
      //       total: data.datas.total,
      //       pageSize: data.datas.pageSize
      //     };
      // }
    },
    showDetail(data){
      this.diaStatus=true
    },
    closeDia(data){
      this.diaStatus=false
      if(data){
        console.log(data)
      } 
      this.reload()
      // window.location.reload()
    }
  }
};
</script>

<style lang="scss">
  .search{
    display: flex;
  }
</style>
